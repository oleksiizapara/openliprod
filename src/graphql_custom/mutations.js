// eslint-disable

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    createdAt
    updatedAt
  }
}
`;

export const createReadingMessage = `mutation CreateReadingMessage($input: CreateReadingMessageInput!) {
  createReadingMessage(input: $input) {
    id
    title
    content
    createdAt
    updatedAt
  }
}
`;

export const updateReadingMessage = `mutation UpdateReadingMessage($input: UpdateReadingMessageInput!) {
  updateReadingMessage(input: $input) {
    id
    title
    content
    createdAt
    updatedAt
  }
}
`;

export const deleteReadingMessage = `mutation DeleteReadingMessage($input: DeleteReadingMessageInput!) {
  deleteReadingMessage(input: $input) {
    id
  }
}
`;

export const createReadingMessageHistory = `mutation CreateReadingMessageHistory(
  $input: CreateReadingMessageHistoryInput!
) {
  createReadingMessageHistory(input: $input) {
    id
  }
}
`;

export const createProgress = `mutation CreateProgress($input: CreateProgressInput!) {
  createProgress(input: $input) {
    id
    author {
      name
      familyName
    }
    authorId
    readingMessageProgresses {
      orderId
      readingMessageId
      readingMessageTitle
      readingMessageProgressUnits {
        readingMessageId
        time
        readingSpeed
        totalWords
        uniqueWords
        recognisedWords
        notRecognisedWords
        recognisedWordsPercent
      }
      time
    }
    time
    isCalculated
    createdAt
    updatedAt
  }
}
`;
export const updateProgress = `mutation UpdateProgress($input: UpdateProgressInput!) {
  updateProgress(input: $input) {
    id
    author {
      name
      familyName
    }
    authorId
    readingMessageProgresses {
      orderId
      readingMessageId
      readingMessageTitle
      readingMessageProgressUnits {
        readingMessageId
        time
        readingSpeed
        totalWords
        uniqueWords
        recognisedWords
        notRecognisedWords
        recognisedWordsPercent
      }
      time
    }
    time
    isCalculated
    createdAt
    updatedAt
  }
}
`;
