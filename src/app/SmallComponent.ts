import { Tree, TreeFactory } from "../_calc-root/Tree";
import { State } from "../_calc-root/State";


interface Opts {
    title: 'title',
    subtitle: 'subtitle'
}

const factory = new TreeFactory<Opts>();
export const SmallComponent = (props: {
        key: string, 
        title: string,
        subtitle: string, 
        onClick: ()=> void
    })  => {
    const tree = factory.getInstance(props.key);
    tree.root({
        'key': props.key,
        'child': [
            tree.div({
                'child': props.title,
                'key': 'title',
                style: {fontSize: '12px'},
                onClick: props.onClick  
            }),
            tree.div({
                'child': props.subtitle,
                'key': 'subtitle',
                style: {fontSize: '10px'},
            }),
        ]
    })

    return tree.calc();   
}
