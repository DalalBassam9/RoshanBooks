import Layout from '../components/Layout';
import CitiesList from '../components/Cities/CitiesList';

export default function Cities() {
    const content = <CitiesList />;


    return (
        <div className="bgcolor">
         {content}
        </div>
    );


};