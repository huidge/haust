Component({
	externalClasses: ['wux-class'],
    relations: {
        '../grids/index': {
            type: 'parent',
        },
    },
    properties: {
        thumb: {
            type: String,
            value: '',
        },
        label: {
            type: String,
            value: '',
        },
        opentype: {
            type: String,
            value: '',
        },
    },
    data: {
        width: '100%',
        bordered: true,
        square: true,
        index: 0,
    },
    methods: {
    	changeCurrent(width, bordered, square, index) {
    		this.setData({
                width,
                bordered,
                square,
                index,
            })
    	},
        onTap() {
            this.triggerEvent('click', this.data)
        },
    },
})