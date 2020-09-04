import {
    h,
    computed,
    inject
} from "vue"


export default {
    name: 'ZCol',

    props: {
        span: {
            type: Number,
            default: 24
        },
        tag: {
            type: String,
            default: 'div'
        },
        xs: Number,
        sm: Number,
        md: Number,
        lg: Number,
        xl: Number,
    },


    setup(props, context) {
        const {
            span,
            tag,
        } = props
        
        const gutter = inject('ZRow')
        

        const style = computed(() => {
            if (gutter) {
                return {
                    paddingLeft: gutter / 2 + 'px',
                    paddingRight: gutter / 2 + 'px'
                }
            }
        })


        let classList = [];


        ['xs', 'sm', 'md', 'lg', 'xl'].forEach(item => {
            if (props[item]) {
                classList.push(`z-col-${item}-${props[item]}`)
            }
        })

        return () => [
            h(tag, {
                class: [
                    'z-col',
                    `z-col-${span}`,
                    classList
                ],
                style:style.value
            }, context.slots)
        ]

    }
}