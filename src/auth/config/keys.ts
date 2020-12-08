import devKeys from './devKeys';
import prodKeys from './prodKeys';


function getKeys() {
    if (process.env.NODE_ENV === 'production') {
        return prodKeys
    } else {
        return devKeys
    }
}


export default getKeys();