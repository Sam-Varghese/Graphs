import React from "react";
class Canvas extends React.Component {
    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const img = this.refs.image;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            ctx.font = "40px Courier";
            ctx.fillText(this.props.text, 210, 75);
        };
    }
    render() {
        return (
            <div>
                <canvas ref="canvas" width={640} height={425} />
                <img ref="image" className="hidden" />
            </div>
        );
    }
}
export default Canvas;
