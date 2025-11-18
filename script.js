let myLibrary=[];

function Book(title, author, pages, imageLink, status)
{
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.imageLink=imageLink || "https://via.placeholder.com/250x250?text=No+Image";
    this.status=status;
    this.id=crypto.randomUUID();
}
Book.prototype.toggleRead= function(){
        this.status= !this.status;
    }
function addBookToLibrary(title,author,pages,imageLink,status)
{
    const newBook= new Book(title,author, pages, imageLink, status);
    myLibrary.push(newBook);
    console.log("Book added", myLibrary);

    displayBook();
    
}
const formsubmission=document.querySelector(".booksubmission");
formsubmission.addEventListener("submit", (e)=>{    
        e.preventDefault();

        const titleValue=document.querySelector("#title").value;
        const authorValue=document.querySelector("#author").value;
        const pagesValue=document.querySelector("#pages").value;
        const imageValue=document.querySelector("#image-link").value;

        const statusChecked=document.querySelector("#status").checked;


        addBookToLibrary(titleValue, authorValue, pagesValue, imageValue, statusChecked);

        formsubmission.reset();
        bookDialog.close();
        
    });
const formElements=Array.from(formsubmission.querySelectorAll('input'));
formsubmission.addEventListener('keydown',(e)=>{
    if(e.key==='Enter' && e.target.tagName==='INPUT')
    {
        const currentIndex=formElements.indexOf(e.target);
        if(currentIndex>-1 && currentIndex<formElements.length-1)
        {
            e.preventDefault();
            const nextElement=formElements[currentIndex+1];
            nextElement.focus();
        }
    }
});
const bookBtn=document.querySelector(".addBook");
const bookDialog=document.querySelector("#bookDialog");
bookBtn.addEventListener("click", () =>{
    bookDialog.showModal();
});
function displayBook()
{
    const showBook=document.querySelector(".grid");
    showBook.innerHTML="";

    myLibrary.forEach((book)=>{
        const card=document.createElement("div");
        card.classList.add("card");//this basically creates a div element
        //and add a class called card to it.<div class="card"></div>
        //we do this so we can later on add styles by using that class name.
         card.dataset.id=book.id;


        const titleEl=document.createElement("h3");
        titleEl.textContent=book.title;

        const authorEl=document.createElement("p");
        authorEl.textContent=book.author;

        const pageEl=document.createElement("p");
        pageEl.textContent=book.pages;

        const imgEl=document.createElement("img");
        imgEl.src=book.imageLink;

        imgEl.onerror= function()
        {
            this.src= "https://via.placeholder.com/250x250?text=No+Image"
        };

        const statusEl=document.createElement("span");
        if(book.status===true)
        {
        statusEl.textContent="Read";
        }
        else{
            statusEl.textContent="Not Read";
        }

        const deleteEl=document.createElement("button");
        deleteEl.textContent="Delete";

        const toggleEl=document.createElement("button");
        toggleEl.textContent="Toggle Read";
        toggleEl.addEventListener("click",()=>{
            book.toggleRead();

            displayBook();
        });
        deleteEl.addEventListener('click',(e)=>{
            //1.Remove the book from myLibrary array.
            //keep the book if its id is NOT equal to the ID of the book 
            //we clicked
            myLibrary=myLibrary.filter(e=> e.id !==book.id);
            
            //Refresh the display to show the new list of books
            displayBook();
        });

        card.appendChild(imgEl);
        card.appendChild(titleEl);
        card.appendChild(authorEl);
        card.appendChild(pageEl);
        
        card.appendChild(statusEl);
        card.appendChild(deleteEl);
        card.appendChild(toggleEl);

        showBook.appendChild(card);
    });
    
}
const themeBtn=document.querySelector("#themeBtn");
themeBtn.addEventListener("click",()=>{
    document.body.classList.toggle("light-mode");
});
addBookToLibrary(
    "The Hobbit",
    "JRR Tolkein",
    295,
    "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?q=80&w=1000&auto=format&fit=crop",
    false

);
addBookToLibrary(
    "1984",
    "George Orwell",
    328,
    "https://images.unsplash.com/photo-1536965764833-5971e0abed7c?q=80&w=1000&auto=format&fit=crop",
    true
);
addBookToLibrary(
    "The Great Gatsby",
    "F. Scott Fitzgerald",
    180,
    "https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg",
    true
);


