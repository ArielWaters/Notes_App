const fs = require('fs');
const readline = require('readline-sync');

const notesFile = 'notes.json';

// Load notes from JSON file
let notes = [];
try {
  const notesData = fs.readFileSync(notesFile, 'utf8');
  notes = JSON.parse(notesData);
} catch (error) {
  console.error('Error reading notes:', error);
}

// Function to save notes to JSON file
function saveNotes() {
  try {
    fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
  } catch (error) {
    console.error('Error saving notes:', error);
  }
}

// Part 1: Add a Note
function addNote() {
  const title = readline.question('Enter note title: ');
  const body = readline.question('Enter note body: ');

  const note = {
    title,
    body,
    time_added: new Date().toISOString()
  };

  notes.push(note);
  saveNotes();
  console.log('Note added successfully!');
}

// Part 2: List All Notes
function listNotes() {
  notes.forEach((note, index) => {
    console.log(`${index + 1}. Title: ${note.title}`);
    console.log(`   Body: ${note.body}`);
    console.log(`   Added on: ${note.time_added}\n`);
  });
}

// Part 3: Read a Note
function readNote() {
  const titleToFind = readline.question('Enter note title: ');
  const foundNote = notes.find(note => note.title === titleToFind);

  if (foundNote) {
    console.log(`Title: ${foundNote.title}`);
    console.log(`Body: ${foundNote.body}`);
    console.log(`Added on: ${foundNote.time_added}`);
  } else {
    console.log('Note not found.');
  }
}

// Part 4: Delete a Note
function deleteNote() {
  const titleToDelete = readline.question('Enter note title: ');
  const noteIndex = notes.findIndex(note => note.title === titleToDelete);

  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);
    saveNotes();
    console.log('Note deleted successfully!');
  } else {
    console.log('Note not found.');
  }
}

// Part 5: Update a Note
function updateNote() {
  const titleToUpdate = readline.question('Enter note title: ');
  const noteToUpdate = notes.find(note => note.title === titleToUpdate);

  if (noteToUpdate) {
    const newBody = readline.question('Enter new note body: ');
    noteToUpdate.body = newBody;
    saveNotes();
    console.log('Note updated successfully!');
  } else {
    console.log('Note not found.');
  }
}

// Main menu loop
while (true) {
  console.log('1. Add a note');
  console.log('2. List all notes');
  console.log('3. Read a note');
  console.log('4. Delete a note');
  console.log('5. Update a note');
  console.log('6. Exit');
  
  const choice = parseInt(readline.question('\nEnter your choice: '));

  switch (choice) {
    case 1:
      addNote();
      break;
    case 2:
      listNotes();
      break;
    case 3:
      readNote();
      break;
    case 4:
      deleteNote();
      break;
    case 5:
      updateNote();
      break;
    case 6:
      process.exit(0);
    default:
      console.log('Invalid choice. Please select a valid option.');
  }
}