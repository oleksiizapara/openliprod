// eslint-disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getReadingMessage = `query GetReadingMessage($id: ID!) {
  getReadingMessage(id: $id) {
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
export const listReadingMessages = `query ListReadingMessages(
  $filter: ModelReadingMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listReadingMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      author {
        id
        username
        name
        familyName
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
    nextToken
  }
}
`;
export const getProgress = `query GetProgress($id: ID!) {
  getProgress(id: $id) {
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
export const listProgresss = `query ListProgresss(
  $filter: ModelProgressFilterInput
  $limit: Int
  $nextToken: String
) {
  listProgresss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      author {
        id
        username
        name
        familyName
        createdAt
        updatedAt
      }
      authorId
      readingMessageProgresses {
        id
        orderId
        readingMessageId
        readingMessageTitle
        time
      }
      isCalculated
      time
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const getReadingMessageHistory = `query GetReadingMessageHistory($id: ID!) {
  getReadingMessageHistory(id: $id) {
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
export const listReadingMessageHistorys = `query ListReadingMessageHistorys(
  $filter: ModelReadingMessageHistoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listReadingMessageHistorys(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      author {
        id
        username
        name
        familyName
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
    nextToken
  }
}
`;
