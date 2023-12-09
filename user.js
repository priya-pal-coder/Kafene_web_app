$(document).ready(function() {

    const renderTableContent = (data) => {
        $('tbody').html('')
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                $('tbody').append(`
                <tr>
                    <td class="lightColor">${data[i].id}</td>
                    <td> <img src=${data[i].profilePic} alt="profile pic"> </td>
                    <td class="lightColor">${data[i].fullName}</td>
                    <td>${data[i].dob}</td>
                    <td class="lightColor">${data[i].gender}</td>
                    <td class="lightColor">${data[i].currentCity} , ${data[i].currentCountry}</td>
                </tr>
            `)
            }
        }
    }
    const getContent = () => {
        $.ajax({
            url: userUrl,
            success: (result) => {
                allContent = result;
                renderTableContent(allContent);
            }
        })
    }

    const searchContent = (urlData) => {
        $.ajax({
            url: urlData,
            success: (result) => {
                currentContent = result;
                renderTableContent(currentContent);
            }
        })
    }


    $('#searchForm').submit((e) => {
        e.preventDefault()
        const inputSearchVal = $('#searchBox').val();
        if (!inputSearchVal.trim()) {
            renderTableContent(allContent)
            return
        }
        if (inputSearchVal.length > 1) {
            $('#searchBox').val('');
            const url = searchUserUrl + inputSearchVal;
            searchContent(url);
        } else {
            alert('please enter atlease 2 character')
        }
    })
    checkLogin();
    getContent();

});