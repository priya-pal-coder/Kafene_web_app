$(document).ready(function() {

    const expired = thatDay => (new Date()) > (new Date(thatDay));

    const settingTableContent = () => {
        const expiredId = $("#expired").prop('checked')
        const lowStockId = $("#lowStock").prop('checked')
        if (allContent.length > 0) {
            currentContent = allContent.filter((value) => {
                if (expiredId) return expired(value.expiryDate)
                return true;
            })
            currentContent = currentContent.filter((value) => {
                if (lowStockId) return value.stock < 100
                return true;
            })
        }
    }

    const renderTableData = () => {
        $('tbody').html('')
        $('#count').html(currentContent.length)
        if (currentContent.length > 0) {
            for (let i = 0; i < currentContent.length; i++) {
                $('tbody').append(`
                <tr>
                    <td class="lightColor w5"> ${currentContent[i].id} </td>
                    <td> ${currentContent[i].medicineName} </td>
                    <td class="lightColor">${currentContent[i].medicineBrand}</td>
                    <td class="w10rem">${currentContent[i].expiryDate}</td>
                    <td class="lightColor">$${currentContent[i].unitPrice}</td>
                    <td>${currentContent[i].stock}</td>
                </tr>
            `)
            }
        }
    }

    const showTableContent = () => {
        settingTableContent();
        renderTableData();
    }

    const getContent = () => {
        $.ajax({
            url: productUrl,
            success: (result) => {
                allContent = result;
                console.log(allContent);
                showTableContent();
            }
        })
    }

    checkLogin();
    getContent();
    $('.checkBox').change(showTableContent)
    expired();
});