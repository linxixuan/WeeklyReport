$(function () {
    // node
    var ndEditer = $('.editer'),
        ndViewer = $('.viewer'),
        ndTargetContainer = $(ndViewer.find('.container')[0]),
        reportObject = {},
        itemIndex = 0;

    // params

    console.log('loaded!');
    
    bindEvent();

    function bindEvent() {
        // viewer event
        ndViewer.delegate('.container', 'click', handleFocusContainer);
        ndViewer.delegate('.gen-report', 'click', generateReport);

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
        var template = $('#step1-item-markup').html(),
            modified = itemIndex % 2 === 1 ? ' item--even' : '',
            title = $(ndEditer.find('.input')[0]).val(), 
            progress = $(ndEditer.find('.input')[1]).val(), 
            type = $(ndEditer.find('.input')[2]).val(), 
            description = $(ndEditer.find('.input')[3]).val(),
            content = {},
            index = 0,
            key = ndTargetContainer.attr("class").split(" ")[0],
            modifiedStr;
        content['title'] = title;
        content['progress'] = progress;
        content['type'] = type;
        content['description'] = description;

        updateReport(content);

        modifiedStr = reportObject[key]['reports'].length % 2 === 0 ? ' item--even' : '';
        itemContent = replace(template, {
            'title' : content['title'],
            'progress' : content['progress'],
            'type' : content['type'],
            'description' : content['description'],
            'modified' : modifiedStr
        });

        ndTargetContainer.append(itemContent);
        itemIndex++;
    }

    // update Report Object
    function updateReport(content) {
        var key = ndTargetContainer.attr("class").split(" ")[0];
        if (!reportObject[key]) {
            reportObject[key] = {};
        }
        if (!reportObject[key]['reports']) {
            reportObject[key]['reports'] = [content];
        } else {
            reportObject[key]['reports'].push(content);
        }
        if (!reportObject[key]['count']) {
            reportObject[key]['count'] = 1;
        } else {
            reportObject[key]['count'] += 1;
        }
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

    // generate a report ready to post
    function generateReport() {
        var itemTemplate = $('#step2-item-markup').html();
        if (isOwnEmpty(reportObject)) {
            alert("请添加周报内容，再生成报告!");
        } else {
            var ndCompleted = $('.resulter').find('.completed'),
                ndPlan = $('.resulter').find('.plan'),
                node,
                ndRefrection = $('.resulter').find('.refrection');

            for (var p in reportObject) {
                console.log(p);
                switch (p) {
                    case "completed":
                        node = ndCompleted;
                        break;
                    case "plan":
                        node = ndPlan;
                        break;
                    default:
                        node = ndRefrection;
                }

                for (var index in reportObject[p]["reports"]) {
                    record = reportObject[p]["reports"][index];
                    node.append(replace(itemTemplate, {
                        'title' : record["title"],
                        'type' : record["type"],
                        'description' : record["description"],
                        'progress' : record["progress"]
                    }));
                }
            }

        }
        console.log(reportObject);
    }
    
    // judge a object is empty
    function isOwnEmpty(obj)
    {
        for(var name in obj)
        {
            if(obj.hasOwnProperty(name))
            {
                return false;
            }
        }
        return true;
    };

    // template => content
    function replace(template, data)
    {
        var pattern;
        for (var p in data) {
            pattern = new RegExp('{' + p + '}', 'g');
            template = template.replace(pattern, data[p]);
        }
        return template;
    }
});
