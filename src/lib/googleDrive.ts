
// Google Drive API utility functions

export interface SavedLetter {
  id: string;
  name: string;
  createdTime: string;
  modifiedTime: string;
  webViewLink: string;
  webContentLink?: string;
}

const LETTERS_FOLDER_NAME = "Letters";

// Function to ensure the Letters folder exists in Google Drive
export async function ensureLettersFolderExists(accessToken: string): Promise<string> {
  try {
    // First check if the folder already exists
    const searchResponse = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=name='${LETTERS_FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const searchData = await searchResponse.json();
    
    // If folder exists, return its ID
    if (searchData.files && searchData.files.length > 0) {
      return searchData.files[0].id;
    }

    // If not, create the folder
    const createResponse = await fetch(
      "https://www.googleapis.com/drive/v3/files",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: LETTERS_FOLDER_NAME,
          mimeType: "application/vnd.google-apps.folder",
        }),
      }
    );

    const folderData = await createResponse.json();
    return folderData.id;
  } catch (error) {
    console.error("Error ensuring Letters folder exists:", error);
    throw new Error("Failed to access or create Letters folder in Google Drive");
  }
}

// Function to save a letter to Google Drive
export async function saveLetterToGoogleDrive(
  accessToken: string,
  title: string,
  content: string
): Promise<SavedLetter> {
  try {
    // Ensure Letters folder exists
    const folderId = await ensureLettersFolderExists(accessToken);

    // Create file metadata
    const metadata = {
      name: title || "Untitled Letter",
      mimeType: "application/vnd.google-apps.document",
      parents: [folderId],
    };

    // Create multipart request body
    const boundary = "-------314159265358979323846";
    const delimiter = "\r\n--" + boundary + "\r\n";
    const closeDelimiter = "\r\n--" + boundary + "--";

    // Convert HTML content to plain text for simple implementation
    // In a production app, you might want to use a better HTML to Google Docs conversion
    // For simplicity, we're just creating a plain text document
    const contentText = content
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .replace(/&nbsp;/g, " "); // Replace non-breaking spaces

    const multipartRequestBody =
      delimiter +
      'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
      JSON.stringify(metadata) +
      delimiter +
      'Content-Type: text/plain\r\n\r\n' +
      contentText +
      closeDelimiter;

    // Create file in Google Drive
    const response = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,createdTime,modifiedTime,webViewLink",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": `multipart/related; boundary=${boundary}`,
        },
        body: multipartRequestBody,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to save letter");
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving letter to Google Drive:", error);
    throw new Error("Failed to save letter to Google Drive");
  }
}

// Function to list all letters from Google Drive
export async function listLettersFromGoogleDrive(
  accessToken: string
): Promise<SavedLetter[]> {
  try {
    // Ensure Letters folder exists
    const folderId = await ensureLettersFolderExists(accessToken);

    // Get all documents in the Letters folder
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents and trashed=false&fields=files(id,name,createdTime,modifiedTime,webViewLink)`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to list letters");
    }

    const data = await response.json();
    return data.files || [];
  } catch (error) {
    console.error("Error listing letters from Google Drive:", error);
    throw new Error("Failed to list letters from Google Drive");
  }
}
