    $(window).on('load', function() {
        $("#b-m").trigger('click');
    });
    document.querySelector('#btnconform').addEventListener('click',(e)=>{
        e.preventDefault;
        document.querySelector('#conform').style.display = 'block';
    });
    document.querySelector('#btncolose').addEventListener('click',(e)=>{
        e.preventDefault;
        document.querySelector('#conform').style.display = 'none';
    });
    let conunter = 1;
    let arr_as = [];
    document.querySelector('#addNew').addEventListener('click',(e)=>{
        e.preventDefault();
        if(arr_as.length < 2){
            let newdiv = document.createElement('div');
            conunter ++;
            arr_as.push(newdiv)
            console.log(arr_as)
            newdiv.innerHTML = `
                    <label>تفاصيل ${conunter}</label>
                    <input type="number" class="form-control" name="delivery_number" value="">
                    <br>
            `;
        document.querySelector('#appendanthorcharge').appendChild(newdiv);
        }
        else{
            null
        }
    
    });