const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'mydatabase';
const client = new MongoClient(url);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName);
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

// Insert one document
async function insertDocument() {
  const db = await connectDB();
  const collection = db.collection('users');
  
  const newUser = { name: 'John Doe', age: 30, city: 'New York' };
  
  const result = await collection.insertOne(newUser);
  console.log(`Inserted ${result.insertedCount} document with _id: ${result.insertedId}`);
  return result.insertedId; // Return the inserted _id to be used in update and delete
}

// Update the inserted document
async function updateDocument(userId) {
  const db = await connectDB();
  const collection = db.collection('users');
  
  const result = await collection.updateOne(
    { _id: userId }, // Filter by _id
    { $set: { age: 35, city: 'San Francisco' } } // Update operation
  );
  console.log(`${result.modifiedCount} document(s) updated`);
}

// Delete the inserted document
async function deleteDocument(userId) {
  const db = await connectDB();
  const collection = db.collection('users');
  
  const result = await collection.deleteOne({ _id: userId });
  console.log(`${result.deletedCount} document(s) deleted`);
}

async function main() {
  try {
    // Insert a new document
    const userId = await insertDocument();

    // Update the document
    await updateDocument(userId);

    // Delete the document
    await deleteDocument(userId);
    
  } catch (error) {
    console.error('Error during operations', error);
  } finally {
    await client.close(); // Ensure the connection is closed
    console.log('Connection closed');
  }
}

// Run the operations
main();
