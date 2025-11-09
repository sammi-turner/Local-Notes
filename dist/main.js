function noteApp() {
    return {
        notes: [],
        newNote: '',
        filter: 'all',
        
        init() {
            // Load notes from localStorage
            const saved = localStorage.getItem('notes');
            if (saved) {
                this.notes = JSON.parse(saved);
            }
        },
        
        addNote() {
            if (this.newNote.trim() === '') return;
            
            this.notes.push({
                id: Date.now(),
                text: this.newNote.trim(),
                completed: false
            });
            
            this.newNote = '';
            this.saveNotes();
        },
        
        deleteNote(index) {
            const noteIndex = this.notes.indexOf(this.filteredNotes[index]);
            this.notes.splice(noteIndex, 1);
            this.saveNotes();
        },
        
        clearCompleted() {
            this.notes = this.notes.filter(note => !note.completed);
            this.saveNotes();
        },
        
        saveNotes() {
            localStorage.setItem('notes', JSON.stringify(this.notes));
        },
        
        get filteredNotes() {
            switch (this.filter) {
                case 'active':
                    return this.activeNotes;
                case 'completed':
                    return this.completedNotes;
                default:
                    return this.notes;
            }
        },
        
        get activeNotes() {
            return this.notes.filter(note => !note.completed);
        },
        
        get completedNotes() {
            return this.notes.filter(note => note.completed);
        }
    }
}