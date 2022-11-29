//Variable declaration
var newitemName;
var newitemId;
var newitemprice;
var newentryDate;

const server = 'http://localhost:4000';
var itemId;
var itemName;
var itemprice;
var entrydate;

var olditemName

var deleteitemId;

var ditemId;
var ditemName;
var dentrydate;
var ditemprice

//Getting content from json file
async function fetchitems() {
    const url = server + '/items';
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }
    const response = await fetch(url, options);
    const items = await response.json();
    populateContent(items);
}


//Adding a item entry
async function additem() {
    const url = server + '/items';
    const items = { id: itemId, name: itemName, date: entrydate, price: itemprice };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(items)
    }
    const response = await fetch(url, options);
}


//Editing a item entry
async function edititem(sName) {
    const url = server + `/items/${sName}`;
    const items = { id: newitemId, name: newitemName, date: newentryDate, price: newitemprice };
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(items)
    }
    const response = await fetch(url, options);
}

// Deleting a item entry
async function deleteitem(sId) {
    const url = server + `/items/${sId}`;
    const items = { id: ditemId, name: ditemName,date: entrydate, price: ditemprice };
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(items)
    }
    const response = await fetch(url, options);
}

//Appending the table with content
function populateContent(itemz) {
    var table = document.getElementById('content');
    table.innerHTML = "<tr><th></th><th> View ALL ITEM ENTRIES Records<th></th></th></tr><tr><th> ID</th><th>Item Name</th><th>Date</th><th>price</th></tr>";
    itemz.forEach(item => {
        var row = document.createElement('tr');
        var dataId = document.createElement('td');
        var textId = document.createTextNode(item.id);
        dataId.appendChild(textId);
        var dataName = document.createElement('td');
        var textName = document.createTextNode(item.name);
        dataName.appendChild(textName);

        var dataDate = document.createElement('td');
        var textDate = document.createTextNode(item.date);
        dataDate.appendChild(textDate);

        var dataprice = document.createElement('td');
        var textprice = document.createTextNode(item.price);
        dataprice.appendChild(textprice);
        row.appendChild(dataId);
        row.appendChild(dataName);
        row.appendChild(dataDate)
        row.appendChild(dataprice);
        table.appendChild(row);
    });
}

//Getting item ids from the json file
var myeurl;
var i;
var emptyList = [];
function getIDs() {
  $.getJSON("/items", function(data) {
    myeurl = data;
    for(i = 0; i < myeurl.length; i++){
      emptyList.push(myeurl[i]["id"])
    }

    // Onclick ADD/SUBMIT
    document.querySelector('form').addEventListener('submit', (e) => {
        
        //Get data from home
        itemId = document.getElementById('itemId').value;
        itemName = document.getElementById('itemName').value;
        entrydate=document.getElementById('entrydate').value;
        itemprice = document.getElementById('itemprice').value;

        //  Checking if ID entry matches any ID in json file
        if (emptyList.includes(itemId)){
          window.alert('There is an existing item ID')
          clear();
          return;
        } 
        
        else if (itemId.length != 4  && itemName === " ") {
            window.alert("item ID should have 4 characters!/ Should not be empty");
            clear();
            return;
        } 
        else if(itemId.length> 4){
            window.alert("item ID should have more than 4 characters!");
            clear();
            return;   
        }
        else if (itemprice < 0) {
            window.alert("price should not be below 0");
            clear();
            return;
        }
        //If alll fields are filled
        if (itemId && itemName &&entrydate&& itemprice) {

            additem();
            fetchitems();
            window.alert("item details added successfully!");
            clear();

        }
        e.preventDefault();
        
        //Clear data fields after submission
        function clear() {
            itemId = document.getElementById('itemId').value = "";
            itemName = document.getElementById('itemName').value = "";
            entrydate = document.getElementById('entrydate').value = "";
            itemprice = document.getElementById('itemprice').value = "";
        }
    });

  });
}
getIDs()

function addcontent() {
    document.querySelector('.add').style.display = 'contents';
    document.querySelector('.view').style.display = 'none';
    document.querySelector('.edit').style.display = 'none';
    document.querySelector('.delete').style.display = 'none';
}



//Searching through data
const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search items.json and filter it
const searchitems = async searchText => {
    const response = await fetch(server + '/items');
    const items = await response.json();

    // Match it according to current text input
    let matches = items.filter(item => {
        const regex = new RegExp(`${searchText}`, 'gi');
        return item.id.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }

    outputHtml(matches);
};

// Show results of the matching
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
        <div>
            <p>${match.id}  ${match.name} ${match.date} (${match.price})</p>
        </div>
        `).join('');

        matchList.innerHTML = html;
    }
}

search.addEventListener('input', () => searchitems(search.value));


//Editing a item entry

const editSearch = document.getElementById('editSearch');
const editList = document.getElementById('edit-list');

// Search items.json and filter it
const edititems = async searchText => {
    const response = await fetch(server + '/items');
    const items = await response.json();

    //TEST
        var the_c_name = [];
        for(i=0; i < items.length; i++){
        the_c_name.push(items[i]["name"]);
        }



    // Get matches to current text input
    let matches = items.filter(item => {
        const regex = new RegExp(`${searchText}`, 'gi');
        return item.id.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        editList.innerHTML = '';
    }

    output(matches);
};

// Show of searching in order to edit
const output = matches => {

    if (matches.length > 0) {

        matches.map(m => {
            olditemName = m.id;
            console.log(olditemName)
        });

        //html form to edit
        const html = matches.map(match =>
            `
        <form id="EDIT">
        <label class="font-weight-bold">EDIT item DETAILS</label>
            <div class="form-group">
                <div class="d-inline mw-100"> ID: </>
                <div class="d-inline"  id="newID" > ${match.id}
            </div>
            <div class="form-group">
                <div class="d-inline">Item Name: </>
                <div name="name" class="d-inline" contenteditable="true" id="newName"> ${match.name} </>
            </div>
            <div class="form-group">
                <div class="d-inline">Entry Date: </>
                <div class="d-inline" contenteditable="true" id="newDate"> ${match.date} </>
            </div>
            <div class="form-group">
                <div class="d-inline">Final price: </>
                <div class="d-inline" contenteditable="true" id="newprice"> ${match.price} </>
        </div>
               
            <button type="submit" class="btn btn-warning d-block w-100 mb-5">EDIT</button>
        </form>


        `).join('');

        

        editList.innerHTML = html;
        
        //Onclick EDIT button
        EDIT.addEventListener('submit', (e) => {
            newitemId = document.querySelector('#newID').innerHTML;
            newitemName = document.querySelector('#newName').innerHTML;
            newentryDate= document.querySelector('#newDate').innerHTML;
            newitemprice = document.querySelector('#newprice').innerHTML;

            if (newitemprice < 0) {
                window.alert("Price should not be below 0");
                clear();
                return;
            }
            edititem(olditemName);
            fetchitems();
            window.alert("Item details editted successfully!");
            window.clear();
            e.preventDefault();
        });
    }

    else{
        
        window.alert('The Item details do not exist')
          
    }
}


editSearch.addEventListener('input', () => edititems(editSearch.value));



//Deleting a item entry

const deleteSearch = document.getElementById('deleteSearch');
const deleteList = document.getElementById('delete-list');

// Search items.json and filter it
const deleteitems = async searchText => {
    const response = await fetch(server + '/items');
    const items = await response.json();

    // Get matches to current text input using a Regular Expression
    let matches = items.filter(item => {
        const regex = new RegExp(`${searchText}`);
        return item.id.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        deleteList.innerHTML = '';
    }

    output2(matches);
};

// If match is found display results
const output2 = matches => {

    if (matches.length > 0) {

        matches.map(m => {
            deleteitemId = m.id;
            console.log(deleteitemId)
        });
        const html = matches.map(match =>
            `
        <form id="DELETE">
        <label class="font-weight-bold">DELETE item DETAILS</label>
            <div class="form-group">
                <div class="d-inline mw-100">item ID: </>
                <div class="d-inline" contenteditable="true" id="newitemId" > ${match.id} </>
            </div>
            <div class="form-group">
                <div class="d-inline">item Name: </>
                <div name="name" class="d-inline" contenteditable="true" id="newitemName"> ${match.name} </>
            </div>
            <div class="form-group">
                <div class="d-inline">Entry Date: </>
                <div class="d-inline" contenteditable="true" id="newDate"> ${match.date} </>
            </div>
            <div class="form-group">
                <div class="d-inline">Final price: </>
                <div class="d-inline" contenteditable="true" id="newitemprice"> ${match.price} </>
            </div>
            <button type="submit" class="btn btn-danger d-block w-100 mb-5">DELETE</button>
        </form>


        `).join('');

        deleteList.innerHTML = html;

        DELETE.addEventListener('submit', (e) => {
            ditemId = document.querySelector('#newitemId').innerHTML;
            ditemName = document.querySelector('#newitemName').innerHTML;
            dentrydate= document.querySelector('#newDate').innerHTML;
            ditemprice = document.querySelector('#newitemprice').innerHTML;

            deleteitem(deleteitemId);
            fetchitems();
            window.alert("item details deleted successfully!");
            window.clear();
            e.preventDefault();
        });
    }

    else{
        window.alert('The item details do not exist')
    }
}


deleteSearch.addEventListener('input', () => deleteitems(deleteSearch.value));

function deletecontent() {
    document.querySelector('.delete').style.display = 'contents';
    document.querySelector('.add').style.display = 'none';
    document.querySelector('.view').style.display = 'none';
    document.querySelector('.edit').style.display = 'none';
}
function editcontent() {
    document.querySelector('.edit').style.display = 'contents';
    document.querySelector('.add').style.display = 'none';
    document.querySelector('.view').style.display = 'none';
    document.querySelector('.delete').style.display = 'none';
}



function viewcontent() {
    document.querySelector('.view').style.display = 'contents';
    document.querySelector('.add').style.display = 'none';
    document.querySelector('.edit').style.display = 'none';
    document.querySelector('.delete').style.display = 'none';
}









