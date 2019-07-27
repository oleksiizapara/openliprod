// eslint-disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    name
    familyName
    readingMessages {
      items {
        id
        authorId
        title
        content
        createdAt
        updatedAt
        access
      }
      nextToken
    }
    readingMessageHistories {
      items {
        id
        authorId
        readingMessageId
        title
        readingSpeed
        totalWords
        uniqueWords
        recognisedWords
        notRecognisedWords
        recognisedWordsPercent
        time
        isCalculated
        createdAt
        updatedAt
      }
      nextToken
    }
    progresses {
      items {
        id
        authorId
        isCalculated
        time
        createdAt
        updatedAt
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    username
    name
    familyName
    readingMessages {
      items {
        id
        authorId
        title
        content
        createdAt
        updatedAt
        access
      }
      nextToken
    }
    readingMessageHistories {
      items {
        id
        authorId
        readingMessageId
        title
        readingSpeed
        totalWords
        uniqueWords
        recognisedWords
        notRecognisedWords
        recognisedWordsPercent
        time
        isCalculated
        createdAt
        updatedAt
      }
      nextToken
    }
    progresses {
      items {
        id
        authorId
        isCalculated
        time
        createdAt
        updatedAt
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    username
    name
    familyName
    readingMessages {
      items {
        id
        authorId
        title
        content
        createdAt
        updatedAt
        access
      }
      nextToken
    }
    readingMessageHistories {
      items {
        id
        authorId
        readingMessageId
        title
        readingSpeed
        totalWords
        uniqueWords
        recognisedWords
        notRecognisedWords
        recognisedWordsPercent
        time
        isCalculated
        createdAt
        updatedAt
      }
      nextToken
    }
    progresses {
      items {
        id
        authorId
        isCalculated
        time
        createdAt
        updatedAt
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const createReadingMessage = `mutation CreateReadingMessage($input: CreateReadingMessageInput!) {
  createReadingMessage(input: $input) {
    id
    author {
      id
      username
      name
      familyName
      readingMessages {
        nextToken
      }
      readingMessageHistories {
        nextToken
      }
      progresses {
        nextToken
      }
      createdAt
      updatedAt
    }
    authorId
    title
    content
    createdAt
    updatedAt
    access
  }
}
`;
export const updateReadingMessage = `mutation UpdateReadingMessage($input: UpdateReadingMessageInput!) {
  updateReadingMessage(input: $input) {
    id
    author {
      id
      username
      name
      familyName
      readingMessages {
        nextToken
      }
      readingMessageHistories {
        nextToken
      }
      progresses {
        nextToken
      }
      createdAt
      updatedAt
    }
    authorId
    title
    content
    createdAt
    updatedAt
    access
  }
}
`;
export const deleteReadingMessage = `mutation DeleteReadingMessage($input: DeleteReadingMessageInput!) {
  deleteReadingMessage(input: $input) {
    id
    author {
      id
      username
      name
      familyName
      readingMessages {
        nextToken
      }
      readingMessageHistories {
        nextToken
      }
      progresses {
        nextToken
      }
      createdAt
      updatedAt
    }
    authorId
    title
    content
    createdAt
    updatedAt
    access
  }
}
`;
export const createProgress = `mutation CreateProgress($input: CreateProgressInput!) {
  createProgress(input: $input) {
    id
    author {
      id
      username
      name
      familyName
      readingMessages {
        nextToken
      }
      readingMessageHistories {
        nextToken
      }
      progresses {
        nextToken
      }
      createdAt
      updatedAt
    }
    authorId
    readingMessageProgresses {
      id
      orderId
      readingMessageId
      readingMessageTitle
      readingMessageProgressUnits {
        id
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
    isCalculated
    time
    createdAt
    updatedAt
  }
}
`;
export const updateProgress = `mutation UpdateProgress($input: UpdateProgressInput!) {
  updateProgress(input: $input) {
    id
    author {
      id
      username
      name
      familyName
      readingMessages {
        nextToken
      }
      readingMessageHistories {
        nextToken
      }
      progresses {
        nextToken
      }
      createdAt
      updatedAt
    }
    authorId
    readingMessageProgresses {
      id
      orderId
      readingMessageId
      readingMessageTitle
      readingMessageProgressUnits {
        id
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
    isCalculated
    time
    createdAt
    updatedAt
  }
}
`;
export const deleteProgress = `mutation DeleteProgress($input: DeleteProgressInput!) {
  deleteProgress(input: $input) {
    id
    author {
      id
      username
      name
      familyName
      readingMessages {
        nextToken
      }
      readingMessageHistories {
        nextToken
      }
      progresses {
        nextToken
      }
      createdAt
      updatedAt
    }
    authorId
    readingMessageProgresses {
      id
      orderId
      readingMessageId
      readingMessageTitle
      readingMessageProgressUnits {
        id
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
    isCalculated
    time
    createdAt
    updatedAt
  }
}
`;
export const createReadingMessageHistory = `mutation CreateReadingMessageHistory(
  $input: CreateReadingMessageHistoryInput!
) {
  createReadingMessageHistory(input: $input) {
    id
    author {
      id
      username
      name
      familyName
      readingMessages {
        nextToken
      }
      readingMessageHistories {
        nextToken
      }
      progresses {
        nextToken
      }
      createdAt
      updatedAt
    }
    authorId
    readingMessageId
    title
    words {
      index
      word
      time
      isNotRecognisedCount
    }
    readingSpeed
    totalWords
    uniqueWords
    recognisedWords
    notRecognisedWords
    recognisedWordsPercent
    time
    isCalculated
    createdAt
    updatedAt
  }
}
`;
export const updateReadingMessageHistory = `mutation UpdateReadingMessageHistory(
  $input: UpdateReadingMessageHistoryInput!
) {
  updateReadingMessageHistory(input: $input) {
    id
    author {
      id
      username
      name
      familyName
      readingMessages {
        nextToken
      }
      readingMessageHistories {
        nextToken
      }
      progresses {
        nextToken
      }
      createdAt
      updatedAt
    }
    authorId
    readingMessageId
    title
    words {
      index
      word
      time
      isNotRecognisedCount
    }
    readingSpeed
    totalWords
    uniqueWords
    recognisedWords
    notRecognisedWords
    recognisedWordsPercent
    time
    isCalculated
    createdAt
    updatedAt
  }
}
`;
export const deleteReadingMessageHistory = `mutation DeleteReadingMessageHistory(
  $input: DeleteReadingMessageHistoryInput!
) {
  deleteReadingMessageHistory(input: $input) {
    id
    author {
      id
      username
      name
      familyName
      readingMessages {
        nextToken
      }
      readingMessageHistories {
        nextToken
      }
      progresses {
        nextToken
      }
      createdAt
      updatedAt
    }
    authorId
    readingMessageId
    title
    words {
      index
      word
      time
      isNotRecognisedCount
    }
    readingSpeed
    totalWords
    uniqueWords
    recognisedWords
    notRecognisedWords
    recognisedWordsPercent
    time
    isCalculated
    createdAt
    updatedAt
  }
}
`;
