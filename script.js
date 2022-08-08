function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
    }
    function shortenURL() {
        let inp = document.getElementById('URL');
        if(!validURL(inp.value)) {
            alert('Invalid URL');
        };
        if(inp.value=='') {
            alert("URL field is empty");
            return;
        }
        xhr = new XMLHttpRequest();
        xhr.open('POST','/shorten');
    }