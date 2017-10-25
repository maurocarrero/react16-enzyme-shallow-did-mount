import React, { Component } from 'react';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() })

class Test extends Component {
  componentDidMount() {
    console.log('Yes, I am cDM and I was called');
  }
  render() {
    return <div>Nothing to declare.</div>
  }
}

describe('shallow(<Test />)', () => {
  const cDMSpy = sinon.spy(Test.prototype, 'componentDidMount');

  beforeEach(() => cDMSpy.reset())

  /**
   * From http://airbnb.io/enzyme/docs/api/shallow.html
   *
   * options.lifecycleExperimental: (Boolean [optional]): If set to true, the entire lifecycle
   * (componentDidMount and componentDidUpdate) of the React component is called. The current default value
   * is false with enzyme v2, but the next major version will flip the default value to true.
   */

  it('should call componentDidMount (surprising but according to docs)', () => {
    shallow(<Test />);
    expect(Test.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('should call componentDidMount and lifecycleExperimental as true.', () => {
    shallow(<Test />, {
      lifecycleExperimental: true
    });
    expect(Test.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('ISSUE: should NOT call componentDidMount and lifecycleExperimental as false, but it does.', () => {
    shallow(<Test />, {
      lifecycleExperimental: false
    });
    expect(Test.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('EVENTUAL TEMPORARY WORKAROUND: should NOT call componentDidMount when disableLifecycleMethods is true', () => {
    shallow(<Test />, {
      disableLifecycleMethods: true
    });
    expect(Test.prototype.componentDidMount.calledOnce).to.equal(false);
  });

  it('should call componentDidMount when disableLifecycleMethods is false', () => {
    shallow(<Test />, {
      disableLifecycleMethods: false
    });
    expect(Test.prototype.componentDidMount.calledOnce).to.equal(true);
  });
});
