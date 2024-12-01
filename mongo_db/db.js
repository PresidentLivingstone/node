const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // MongoDB connection URL
const dbName = 'mydatabase'; // Database name
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

// 1. Create a new document in the collection
async function createDocument() {
  const db = await connectDB();
  const collection = db.collection('users'); // Collection name

  const newUser = { name: 'John Doe', age: 30, city: 'New York' }; // Document to insert

  const result = await collection.insertOne(newUser); // Insert the document
  console.log(`Inserted ${result.insertedCount} document with _id: ${result.insertedId}`);
  return result.insertedId; // Return the inserted _id to use in update or delete
}

// 2. Read documents from the collection
async function readDocuments() {
  const db = await connectDB();
  const collection = db.collection('users'); // Collection name

  const users = await collection.find({}).toArray(); // Find all documents
  console.log('Users in the collection:', users);
}

// 3. Update an existing document
async function updateDocument(userId) {
  const db = await connectDB();
  const collection = db.collection('users'); // Collection name

  const result = await collection.updateOne(
    { _id: userId }, // Filter by _id
    { $set: { age: 35, city: 'San Francisco' } } // Update operation
  );
  console.log(`${result.modifiedCount} document(s) updated`);
}

// 4. Delete a document from the collection
async function deleteDocument(userId) {
  const db = await connectDB();
  const collection = db.collection('users'); // Collection name

  const result = await collection.deleteOne({ _id: userId }); // Delete by _id
  console.log(`${result.deletedCount} document(s) deleted`);
}

// Main function to execute the operations in sequence
async function main() {
  try {
    // Step 1: Create a new document
    const userId = await createDocument();

    // Step 2: Read all documents
    await readDocuments();

    // Step 3: Update the document
    await updateDocument(userId);

    // Step 4: Read all documents after update
    await readDocuments();

    // Step 5: Delete the document
    await deleteDocument(userId);

    // Step 6: Read all documents after deletion
    await readDocuments();
  } catch (error) {
    console.error('Error during operations', error);
  } finally {
    await client.close(); // Ensure the connection is closed
    console.log('Connection closed');
  }
}

// Execute the main function
main();
