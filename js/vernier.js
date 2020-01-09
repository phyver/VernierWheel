// global variables
var WIDTH = 150; // width (mm) of svg element
var HEIGHT = 150; // height (mm) of svg element
var N = 100;
var D = 10;
var SHOW_WHEEL = true;
var WHEEL_DIAM = 75;
var WHEEL_OFFSET = 0;
var SHOW_OFFSET = true;
var SHOW_VERNIER_NUMBERS = true;
var VERNIER_NUMBERS_SIZE = 2;
var NB_VERNIERS = 1;
var THIN_TICKS = 0.2;
var THICK_TICKS = 0.3;

var SVG_FILE = null;
var DRAW = null;

// main function: draws the crease pattern by looking up the parameters
function draw_vernier() {
    DRAW.clear();
    DRAW.height(HEIGHT + 'mm');
    DRAW.width(WIDTH + 'mm');
    DRAW.viewbox(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT);

    var d, g;
    var w, l;

    var vernier = DRAW.group();
    var i;
    var offset;

    // circle at wheel diameter
    vernier.circle(WHEEL_DIAM).stroke({
        color: "#aaa",
        width: 0.2,
    }).fill("none").center(0, 0);
    // concentric rings, 5mm appart
    for (d = 20; d < WHEEL_DIAM; d += 5) {
        vernier.circle(d).stroke({
            color: "#aaa",
            width: 0.2,
        }).fill("none").center(0, 0);
    }

    // the Vernier scales
    for (i=0; i<NB_VERNIERS; i++) {
        offset = i * 360 / NB_VERNIERS;
        for (d = 0; d < D + 1; d++) {
            if (d % (D/2) === 0) {
                w = THICK_TICKS;
                l = 4;
            } else {
                w = THIN_TICKS;
                l = 3;
            }
            g = vernier.group();
            g.line(0, -10, 0, -(WHEEL_DIAM / 2 + l)).stroke({
                width: w,
                color: 'black',
            });
            if (SHOW_VERNIER_NUMBERS) {
                g.text(d.toString()).font('size', VERNIER_NUMBERS_SIZE).center(0, -(WHEEL_DIAM / 2 + 6));
            }

            g.rotate(offset + d * 360 * (D - 1) / (D * N), 0, 0);
        }
    }


    if (SHOW_WHEEL) {
        var wheel = DRAW.group();
        wheel.circle(WHEEL_DIAM).fill("#eee").stroke({
            width: 0.5,
            color: "#aaa",
        }).center(0, 0);
        wheel.circle(WHEEL_DIAM / 2).fill("#aaa").center(0, 0);
        for (d = 0; d < N; d++) {
            w = 0.2;
            if (d % 5 === 0) {
                l = 4;
            } else {
                l = 3;
            }
            g = wheel.group();
            g.line(0, -(WHEEL_DIAM / 2 - l), 0, -WHEEL_DIAM / 2).stroke({
                width: w,
                color: "#aaa"
            });
            if (d % 10 === 0) {
                g.text(d.toString()).font('size', 4).center(0, -WHEEL_DIAM / 2 + 6).fill("#aaa");
            }
            g.rotate(d * 360 / N, 0, 0);
        }
        wheel.rotate(-WHEEL_OFFSET * 360 / N, 0, 0);
        if (SHOW_OFFSET) {
            wheel.text(WHEEL_OFFSET.toString()).font('size', 5).fill("#777").center(0, 0).rotate(WHEEL_OFFSET * 360 / N,0 ,0);
        }

    }


    // create link to download svg file
    var link = $("#download_svg");
    link.attr("href", create_svg_content(DRAW.svg()));
}


function update_config() {
    N = parseInt($('#N').val());
    D = parseInt($('#D').val());
    SHOW_WHEEL = $("#wheel").is(":checked");

    var tmp = $("#nb_verniers");
    var n = Math.floor((D*N)/((D+2)*(D-1)));
    tmp.attr("max", n);
    NB_VERNIERS = parseInt(Math.min(tmp.val(),n));
    tmp.val(NB_VERNIERS);

    WIDTH = parseInt($("#width").val());
    HEIGHT = parseInt($("#height").val());
    WHEEL_DIAM = parseFloat($("#diameter").val());
    WHEEL_OFFSET = parseFloat($("#offset").val());
    SHOW_OFFSET = $("#show_offset").is(":checked");
    SHOW_VERNIER_NUMBERS = $("#vernier_numbers").is(":checked");
    VERNIER_NUMBERS_SIZE = parseFloat($("#vernier_numbers_size").val());

    THIN_TICKS = parseFloat($("#thin_ticks").val());
    THICK_TICKS = parseFloat($("#thick_ticks").val());
}

function draw() {
    update_config();
    draw_vernier();
}


// create a virtual file to download
function create_svg_content(content) {
    var data = new Blob([content], {
        type: 'text/svg'
    });
    if (SVG_FILE !== null) {
        window.URL.revokeObjectURL(SVG_FILE);
    }
    SVG_FILE = window.URL.createObjectURL(data);
    return SVG_FILE;
}

$(document).ready(function() {
    $("#no_javascript").remove();

    update_config();
    $('#offset').val(Math.floor(Math.random()*N*10)/10);

    DRAW = SVG().addTo("#vernier").size(WIDTH + 'mm', HEIGHT + 'mm');
    draw();
    $("svg").svgPanZoom();

    $("#N").bind("input", draw);
    $("#D").bind("input", draw);
    $("#wheel").bind("input", draw);
    $("#width").bind("input", draw);
    $("#height").bind("input", draw);
    $("#diameter").bind("input", draw);
    $("#offset").bind("input", draw);
    $("#show_offset").bind("input", draw);
    $("#vernier_numbers").bind("input", draw);
    $("#vernier_numbers_size").bind("input", draw);
    $("#nb_verniers").bind("input", draw);
    $("#thin_ticks").bind("input", draw);
    $("#thick_ticks").bind("input", draw);

    $("#update_button").click(draw);
});
