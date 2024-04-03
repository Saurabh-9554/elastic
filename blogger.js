const { createIndex,deleteDocument ,addDocument, deleteIndex, searchByWildcardItemName } = require('./esIndexManager');

async function CreateIndex(req,res){
    var indexName = req.body.indexName;
    createIndex(indexName)
}

async function DeleteIndex(req,res){
    var indexName = req.body.indexName;
    deleteIndex(indexName)
}

async function AddDocument(req,res){
    var indexName = req.body.indexName;
    var document = req.body.document
    addDocument(indexName,document)
}

async function DeleteDocument(req,res){
    var indexName = req.body.indexName;
    var _id = req.body._id;
    deleteDocument(indexName,_id)
}
// createIndex("news_headlines");
// addDocument()
// deleteIndex("news_headlines");

const fs = require('fs');

async function addDocumentsFromJSON(indexName, jsonFilePath) {
    try {
        // Read JSON file
        const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
        const documents = jsonData.trim().split('\n'); // Split the file content by lines

        // Iterate over each document
        for (const jsonDocument of documents) {
            // Parse JSON data
            const document = JSON.parse(jsonDocument);
            
            // Call addDocument function to add the document to Elasticsearch
            await addDocument(indexName, document);
        }
        console.log('All documents added successfully.');
    } catch (error) {
        console.error('Error adding documents:', error);
    }
}


// Usage example
const indexName = 'news_headlines';
const jsonFilePath = './News_Category_Dataset_v2.json';

// Call the function to add documents from the JSON file
addDocumentsFromJSON(indexName, jsonFilePath);