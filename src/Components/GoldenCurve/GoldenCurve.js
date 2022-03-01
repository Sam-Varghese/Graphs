import React, { useRef, useEffect, useState } from "react";
import "./GoldenCurve.scss";
import useForceUpdate from "use-force-update";
const _ = require("lodash");

function CanvasGraph() {
    const canvas = useRef();
    let ctx = null;
    const [getFibCount, setFibCount] = useState(100);
    const [getZoom, setZoom] = useState(0.3);

	
    function handleFibonacciInputChange(event) {
        console.log(`Setting the fibonacci count to ${getFibCount}`);
        setFibCount(event.target.value);
	}
	function handleZoomInputChange(event) {
		setZoom(event.target.value);
	 }
    // initialize the canvas context
	useEffect(() => {
		console.log(`Re-rendering the graph`)
        // dynamically assign the width and height to canvas
        const canvasEle = canvas.current;
        canvasEle.width = window.innerWidth;
        canvasEle.height = window.innerHeight;

        // get context of the canvas
        ctx = canvasEle.getContext("2d");
        var fibonacciNumbers = [0, 1];
        var xCoordinates = [0];
        var yCoordinates = [0];
        var radius = [];
		ctx.scale(getZoom, getZoom);
        var startingAngles = [];
        for (let i = 0; i < 100; i++) {
            fibonacciNumbers.push(
                fibonacciNumbers[i] + fibonacciNumbers[i + 1]
            );
            radius.push(fibonacciNumbers[i + 2]);
            startingAngles.push((Math.PI / 2) * (i + 1));
            // Making the curves
            ctx.beginPath();
			ctx.lineWidth = 10;
            ctx.arc(
                xCoordinates[i] + (window.innerWidth),
                yCoordinates[i] + window.innerHeight,
                radius[i],
                startingAngles[i],
                startingAngles[i] + Math.PI / 2
            );
            ctx.stroke();
            if (i % 4 == 0) {
                // Move x coordinate to right
                xCoordinates.push(
                    fibonacciNumbers[i + 1] + _.last(xCoordinates)
                );
                // yCoordinate will remain the same
                yCoordinates.push(_.last(yCoordinates));
            } else if (i % 4 == 1) {
                // Move yCoordinate up
                yCoordinates.push(
                    fibonacciNumbers[i + 1] + _.last(yCoordinates)
                );
                // xCoordinates
                xCoordinates.push(_.last(xCoordinates));
            } else if (i % 4 == 2) {
                // Move x coordinate back
                xCoordinates.push(
                    _.last(xCoordinates) - fibonacciNumbers[i + 1]
                );
                // yCoordinate will remain the same
                yCoordinates.push(_.last(yCoordinates));
            } else if (i % 4 == 3) {
                // Move y coordinate down
                yCoordinates.push(
                    _.last(yCoordinates) - fibonacciNumbers[i + 1]
                );
                // xCoordinate will remain the same
                xCoordinates.push(_.last(xCoordinates));
            }
        }
    }, []);

    return (
        <div className="CanvasGraph">
			<canvas ref={canvas} className="canvasDiv"></canvas>
        </div>
    );
}

export default CanvasGraph;
