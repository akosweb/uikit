import Class from '../mixin/class';
import Media from '../mixin/media';
import {attr, getCssVar, toggleClass, unwrap, wrapInner} from 'uikit-util';

export default {

    mixins: [Class, Media],

    props: {
        fill: String
    },

    data: {
        fill: '',
        clsWrapper: 'ui-leader-fill',
        clsHide: 'ui-leader-hide',
        attrFill: 'data-fill'
    },

    computed: {

        fill({fill}) {
            return fill || getCssVar('leader-fill-content');
        }

    },

    connected() {
        [this.wrapper] = wrapInner(this.$el, `<span class="${this.clsWrapper}">`);
    },

    disconnected() {
        unwrap(this.wrapper.childNodes);
    },

    update: {

        read({changed, width}) {

            const prev = width;

            width = Math.floor(this.$el.offsetWidth / 2);

            return {
                width,
                changed: changed || prev !== width,
                hide: !this.matchMedia
            };
        },

        write(data) {

            toggleClass(this.wrapper, this.clsHide, data.hide);

            if (data.changed) {
                data.changed = false;
                attr(this.wrapper, this.attrFill, new Array(data.width).join(this.fill));
            }

        },

        events: ['load', 'resize']

    }

};
