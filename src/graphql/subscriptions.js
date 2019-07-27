// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateReadingMessage = `subscription OnCreateReadingMessage {
  onCreateReadingMessage {
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
export const onUpdateReadingMessage = `subscription OnUpdateReadingMessage {
  onUpdateReadingMessage {
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
export const onDeleteReadingMessage = `subscription OnDeleteReadingMessage {
  onDeleteReadingMessage {
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
export const onCreateProgress = `subscription OnCreateProgress {
  onCreateProgress {
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
export const onUpdateProgress = `subscription OnUpdateProgress {
  onUpdateProgress {
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
export const onDeleteProgress = `subscription OnDeleteProgress {
  onDeleteProgress {
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
export const onCreateReadingMessageHistory = `subscription OnCreateReadingMessageHistory {
  onCreateReadingMessageHistory {
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
export const onUpdateReadingMessageHistory = `subscription OnUpdateReadingMessageHistory {
  onUpdateReadingMessageHistory {
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
export const onDeleteReadingMessageHistory = `subscription OnDeleteReadingMessageHistory {
  onDeleteReadingMessageHistory {
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
