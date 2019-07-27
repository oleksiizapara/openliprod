// eslint-disable
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    name
    familyName
    
    progresses {
      items {
        id
        isCalculated
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
    title
    content
    authorId
  	author {
      name
      familyName
    }
    access
    createdAt
  }
}
`;

export const getReadingMessagesByAuthor = `
query GetReadingMessageByAuthor(
  $authorId: String!, 
  $pageSize: Int!
  $nextToken: String
) {
  listReadingMessages(
    nextToken:$nextToken
    limit: $pageSize
    filter: { authorId: {eq:  $authorId} }
  ) {
    nextToken
    items {
      id
      authorId
      author {
        name
        familyName
      }
      title
      content
      createdAt
      access
      updatedAt
    }
  }
}
`;

export const getSearchMessages = `
query getSearchMessages(
  $searchText: String!
  $pageSize: Int!
  $nextToken: String
) {
  listReadingMessages(
    nextToken:$nextToken
    limit: $pageSize
    filter: {  
      title :{contains :$searchText  }
      access : {eq: PUBLIC}
    }
  ) {
    nextToken
    items {
      id
      authorId
      author {
        name
        familyName
      }
      title
      content
      createdAt
      access
      updatedAt
    }
  }
}
`;

export const getProgress = `query GetProgress($id: ID!) {
  getProgress(id: $id) {
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

export const listProgresss = `query listProgresss(
  $filter: ModelProgressFilterInput
  $limit: Int
  $nextToken: String
) {
  listProgresss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      authorId
      readingMessageProgresses {
        orderId
        readingMessageId
        readingMessageTitle
        time
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
      }
      time
      isCalculated
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
