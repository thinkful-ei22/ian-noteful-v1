const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

// GET Notes with search
notes.filter('cats', (err, list) => {
  if (err) {
    console.error(err);
  }
  console.log(list);
});

// GET Notes by ID
notes.find(1005, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});

// PUT (Update) Notes by ID
const updateObj = {
  title: 'New Title',
  content: 'Blah blah blah'
};

notes.update(1005, updateObj, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});

const newObj = {
    title: 'new note',
    contents: 'this is my new note'
} 

notes.create(newObj, (err, newItem) => {
    if(err) {
     console.log(err);
    }
    else{
        console.log(`${newItem}`);
    }
})

notes.delete(1005, (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log('note deleted!');
    }
});