$(function () {
    // node
    var ndEditer = $('.editer'),
        ndViewer = $('.viewer'),
        ndTargetContainer = $(ndViewer.find('.container')[0]);

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
        console.log(ndTargetContainer.attr('class'));
        var template = $('#list-item-markup').html(),
            title = $(ndEditer.find('.input')[0]).val(), 
            progress = $(ndEditer.find('.input')[1]).val(), 
            type = $(ndEditer.find('.input')[2]).val(), 
            description = $(ndEditer.find('.input')[3]).val(),
            content;
        content = mergeArry(template.split('*'), [title, progress, type, description]).join('');

        ndTargetContainer.html(content);
    }

    function mergeArry(a, b) {
        var minLen = a.length <= b.length ? a.length : b.length,
            c = [],
            i;
        for (i = 0; i < minLen; i++) {
            c.push(a[i]);
            c.push(b[i]);
        }
        while (i < a.length) c.push(a[i++]);
        while (i < b.length) c.push(b[i++]);

        return c;
    }
});
