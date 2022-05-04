import './skeleton.scss';
import '../../style/style.scss';

const SkeletonStocks = () => {

    const sceleton = () => {
        const content = [];

        for (let index = 0; index < 4; index++) {
            content.push(
                    <div key={index} className="skeleton__item">
                        <div className="pulse skeleton__header">
                        </div>
                        <div className="pulse skeleton__block"></div>
                        <div className="pulse skeleton__block"></div>
                    </div>
            )
        }
        return content;
    }

    return (
        <div className="skeleton container">
                {sceleton()}
        </div>
    )
}

export default SkeletonStocks;