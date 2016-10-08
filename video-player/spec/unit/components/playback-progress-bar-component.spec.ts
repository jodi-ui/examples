import {expect} from 'chai';
import {render} from 'jodi-ui-dom';
import {playbackProgressBarComponent} from '../../../src/components/playback-progress-bar-component';

const COMPONENT_TAG = 'playback-progress-bar-component';

describe(`playbackProgressBarComponent`, () => {
    it(`should have meter which has 30% if current time is set to 300 and duration is set to 1000`, () => {
        const node: HTMLElement = document.createElement('div');
        render(node, () => {
            playbackProgressBarComponent(300, 1000, () => {
            });
        });

        const bar = <HTMLElement|any> node.querySelector(COMPONENT_TAG);
        const meter = bar.querySelector('.meter');

        expect(meter.style.width).to.equal('30%');
    });

    it(`should execute 'seek' callback with value of 200 after clicking on the point lying at 20% width of it's 1000px width`, (done) => {

        const node: HTMLElement = document.createElement('div');
        const seek = (value) => {
            expect(value).to.equal(200);
            done();
        };

        render(node, () => {
            playbackProgressBarComponent(0, 1000, seek);
        });

        const bar = <HTMLElement|any> node.querySelector(COMPONENT_TAG);

        // override getBoundingClientRect
        bar.getBoundingClientRect = () => {
            return {
                left: 10,
                width: 500
            }
        };

        // simulate click event
        const event = new MouseEvent('click', {clientX: 110});
        bar.dispatchEvent(event);
    });
});
