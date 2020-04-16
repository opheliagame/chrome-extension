window.onload = function(e) {   
    console.log("window loaded");
    chrome.storage.sync.get(['sHistory', 'sName'], function(data) {
        var treeData = constructingD3DataStructure(data.sHistory, data.sName);
        displayTree(treeData);
    });
}

function displayTree(treeData) {
    // Declares a tree layout and assigns the size
    var height = 500;
    var width = 500;
    var margin = 50;

    console.log(treeData);
    var root = d3.hierarchy(treeData);
    var treeLayout = d3.tree();
    treeLayout.size([height-2*margin, width-2*margin]);
    treeLayout(root);

    console.log(root);

    var svg = d3.select("body")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

    
    svg.append("g")
        .classed("nodes", true)
        .attr("transform", "translate(" + margin + "," + margin + ")");

    
    svg.append("g")
        .classed("links", true)
        .attr("transform", "translate(" + margin + "," + margin + ")"); 

    // Nodes
    var nodes = d3.select('svg g.nodes')
        .selectAll('circle.node')
        .data(root.descendants())
        .enter();

    nodes.append('circle')
        .classed('node', true)
        .attr('cx', function(d) {return d.x;})
        .attr('cy', function(d) {return d.y;})
        .attr('r', 5);

    nodes.append('text')
        .classed('title', true)
        .attr('x', function(d) {return d.x+10;})
        .attr('y', function(d) {return d.y;})
        .attr('fill', 'black')
        .text(function(d) {
            return d.data.data.title;
        });

    // Links
    d3.select('svg g.links')
        .selectAll('line.link')
        .data(root.links())
        .enter()
        .append('line')
        .classed('link', true)
        .attr('x1', function(d) {return d.source.x;})
        .attr('y1', function(d) {return d.source.y;})
        .attr('x2', function(d) {return d.target.x;})
        .attr('y2', function(d) {return d.target.y;});

    console.log("Finished.");
    
    
}


function constructingD3DataStructure(sHistory, sName) {
    console.log("constructing tree structure");

    let rootNodes = [];
    let allNodes = new Set(Object.keys(sHistory));

    console.log("ALL NODES: ");
    console.log(allNodes);
    
    //building set of next nodes
    let nextNodes = [];
    for(ele in sHistory) {
        let next = sHistory[ele].next;
        nextNodes.push(...next);
    }
    nextNodes = new Set(nextNodes);

    console.log("NEXT NODES: ");
    console.log(nextNodes);

    //finding rootNodes
    rootNodes = new Set([...allNodes].filter(x => !nextNodes.has(x)));

    console.log("ROOT NODES: ");
    console.log(rootNodes);

    //building the session tree
    console.log("Beginning construction...");
    let trees = {data: {title: sName}, children: []};
    
    for(r of Array.from(rootNodes)) {
        //console.log("contructing trees...");
        let treeData = {};
        hash = parseInt(r);
        treeData = recursive(sHistory[hash], sHistory);
        //console.log("Tree data: ");
        //console.log(treeData);
        trees.children.push(treeData);
    }
    return trees;
}

function recursive(histItem, sHistory) {
    console.log(histItem);

    let children = [];
    let child = {data: {title: histItem.title, href: histItem.href}};
    
    if (histItem.next.length == 0) {
        return child;
    }
    else {
        console.log(histItem.next);
        for(hash of histItem.next) {
            console.log(hash);
            children.push(recursive(sHistory[hash], sHistory));
        }
        child.children = children;
        console.log(child);
        return child;
    }
}

function displayUrls(hist) {
    main = document.getElementById('main');
    console.log(hist);
    for(hash in hist) {
        let histobj = hist[hash];


        let p = document.createElement("p");
        p.innerHTML = histobj.title;
        
        main.appendChild(p);
    }
}