import {Page} from "../core/Page";
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {createStore} from '../core/store/createStore';
import {rootReducer} from '../redux/rootReducer';
import {normalizeInitialState} from '../redux/initialState';
import {storage, debounce} from '../core/util';

function storageName(param){
    return 'excel/' + param
}

export class ExcelPage extends Page {
    getRoot(){
        const params = this.params ? this.params : Date.now().toString()
        const state = storage(storageName(this.params))
        const store = createStore(rootReducer, normalizeInitialState(state))
        const stateListener = debounce(state => storage(storageName(params), state),300)

        store.subscribe(stateListener)

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        }) 

       return this.excel.getRoot()
    }

    afterRoot(){
        this.excel.init()
    }

    destroy(){
        this.excel.destroy()
    }
}