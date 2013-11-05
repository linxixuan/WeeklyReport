$(function () {
    // node
    var ndEditer = $('.editer'),
        ndViewer = $('.viewer'),
        ndTargetContainer = ndViewer.one('.container');

    // params

    console.log('loaded!');
    
    bindEvent();

    function bindEvent() {
        // viewer event
        ndViewer.delegate('.container', 'click', handleFocusContainer);

        // editer event
        ndEditer.delegate('.add-record', 'click', handAddRecord);
    }
    
    // focus the container
    function handleFocusContainer() {
        ndViewer.find('.container').removeClass('selected');
        ndTargetContainer = $(this);
        $(this).addClass('selected');
    }

    // add record
    function handAddRecord() {
        console.log(1);
    }
});
