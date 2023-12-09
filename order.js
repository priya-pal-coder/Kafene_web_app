$(document).ready(function() {

    const settingTableContent = () => {
        const newId = $("#new").prop('checked');
        const packedId = $("#packed").prop('checked');
        const intransitId = $("#intransit").prop('checked');
        const deliveredId = $("#delivered").prop('checked');
        if (allContent.length > 0) {
            currentContent = allContent.filter((value) => {
                if (newId && value.orderStatus === 'New') return true;
                if (packedId && value.orderStatus === 'Packed') return true;
                if (deliveredId && value.orderStatus === 'Delivered') return true;
                if (intransitId && value.orderStatus === 'InTransit') return true;
                return false;

            })
        }
    }
    
    const renderTableData = () => {
        $('tbody').html('');
        $('#count').html(currentContent.length);
        if (currentContent.length > 0) {

            for (let i = 0; i < currentContent.length; i++) {
                $('tbody').append(`
                <tr>
                    <td class="lightColor"> ${currentContent[i].id} </td>
                    <td> ${currentContent[i].customerName} </td>
                    <td>${currentContent[i].orderDate}<p class="lightColor lightP">${currentContent[i].orderTime}</p>
                    </td>
                    <td class="lightColor">$${currentContent[i].amount}</td>
                    <td>${currentContent[i].orderStatus}</td>
                </tr>
            `)
            }

        }

    }
    const showTableContent = () => {
        settingTableContent();
        renderTableData();
    }
    const getTableContent = () => {
        $.ajax({
            url: orderUrl,
            success: (result) => {
                allContent = result;
                console.log(allContent);
                showTableContent();
            }
        })
    }

    checkLogin();
    getTableContent();
    $('.checkBox').change(showTableContent);

});