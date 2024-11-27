// Path to the text file database
const DB_FILE = './db.txt';

// Helper to load database
function loadDatabase() {
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

// Helper to save database
function saveDatabase(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Define a "Model" class
class Model {
  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  // Simulate `find`
  find(query = {}) {
    const db = loadDatabase();
    return db.filter(item =>
      Object.keys(query).every(key => item[key] === query[key])
    );
  }

  // Simulate `findOne`
  findOne(query = {}) {
    const db = loadDatabase();
    return db.find(item =>
      Object.keys(query).every(key => item[key] === query[key])
    );
  }

  // Simulate `create`
  create(doc) {
    const db = loadDatabase();
    const newDoc = { ...doc, id: db.length + 1 }; // Auto-increment ID
    db.push(newDoc);
    saveDatabase(db);
    return newDoc;
  }

  // Simulate `updateOne`
  updateOne(filter, update) {
    const db = loadDatabase();
    let updated = false;
    const updatedDb = db.map(item => {
      if (Object.keys(filter).every(key => item[key] === filter[key])) {
        updated = true;
        return { ...item, ...update };
      }
      return item;
    });
    saveDatabase(updatedDb);
    return updated ? { success: true } : { success: false };
  }

  // Simulate `deleteOne`
  deleteOne(filter) {
    const db = loadDatabase();
    const filteredDb = db.filter(
      item => !Object.keys(filter).every(key => item[key] === filter[key])
    );
    saveDatabase(filteredDb);
    return db.length !== filteredDb.length
      ? { success: true }
      : { success: false };
  }
}