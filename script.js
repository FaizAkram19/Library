const myLibrary=[];

function Book(title, author, pages, imageLink, status)
{
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.imageLink=imageLink;
    this.status=status;
    this.id=crypto.randomUUID();
}
function addBookToLibrary(title,author,pages,imageLink,status)
{
    const newBook= new Book(title,author, pages, imageLink, status);
    myLibrary.push(newBook);
    console.log("Book added", myLibrary);
    
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
const bookBtn=document.querySelector(".addBook");
const bookDialog=document.querySelector("#bookDialog");
bookBtn.addEventListener("click", () =>{
    bookDialog.showModal();
});
