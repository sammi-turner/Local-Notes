import './style.css'

class NotesApp {
  constructor() {
    this.notes = JSON.parse(localStorage.getItem('notes')) || [];
    this.currentId = this.notes.length > 0 ? Math.max(...this.notes.map(note => note.id)) + 1 : 1;
    this.render();
    this.addEventListeners();
  }

  addNote(content) {
    const newNote = { id: this.currentId++, content, createdAt: new Date() };
    this.notes.push(newNote);
    this.saveNotes();
    this.render();
  }

  editNote(id, content) {
    const note = this.notes.find(note => note.id === id);
    if (note) {
      note.content = content;
      this.saveNotes();
    }
  }

  deleteNote(id) {
    this.notes = this.notes.filter(note => note.id !== id);
    this.saveNotes();
    this.render();
  }

  saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <h1 class="text-3xl font-bold mb-4">Local Notes</h1>
      <div class="mb-4">
        <textarea id="newNote" class="w-full p-2 border rounded" rows="3" placeholder="Enter a new note"></textarea>
        <button id="addNote" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Add Note</button>
      </div>
      <div id="notesList">
        ${this.notes.map(note => `
          <div class="bg-white p-4 mb-4 rounded shadow">
            <textarea class="w-full p-2 border rounded noteContent" data-id="${note.id}">${note.content}</textarea>
            <div class="mt-2">
              <button class="deleteNote bg-red-500 text-white px-2 py-1 rounded" data-id="${note.id}">Delete</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  addEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.id === 'addNote') {
        const content = document.getElementById('newNote').value.trim();
        if (content) {
          this.addNote(content);
          document.getElementById('newNote').value = '';
        }
      } else if (e.target.classList.contains('deleteNote')) {
        const id = parseInt(e.target.dataset.id);
        this.deleteNote(id);
      }
    });

    document.addEventListener('input', (e) => {
      if (e.target.classList.contains('noteContent')) {
        const id = parseInt(e.target.dataset.id);
        const content = e.target.value.trim();
        this.editNote(id, content);
      }
    });
  }
}

new NotesApp();