import './skeleton.scss';
import '../../style/style.scss';

const Skeleton = () => {

    const sceleton = () => {
        const content = [];

        for (let index = 0; index < 8; index++) {
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

export default Skeleton;