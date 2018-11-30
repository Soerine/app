define(["./my-app.js"],function(_myApp){"use strict";class MyView1 extends _myApp.PageViewElement{render(){return _myApp.html`
      ${_myApp.SharedStyles}
      <section>
        <h2>We love all magical beings!</h2>
        <p>This is a page for magic beings! We love them all! Yay</p>
      </section>
      <section>
        <h2>Help us - Help them!</h2>
        <p>Suspendisse porttitor id purus eu cursus. Suspendisse arcu nulla, mattis vel hendrerit et, malesuada a elit. Nam at diam ornare, aliquet est sed, malesuada metus. Cras nec enim vel nibh tincidunt euismod ut et enim. Etiam pharetra eros in sodales iaculis. Duis sagittis urna et cursus mollis. Cras tempor rutrum est. Praesent sollicitudin ligula at laoreet placerat. Praesent tortor dui, semper in sapien non, pharetra luctus turpis.</p>
      </section>
      <section>
        <p>
        You should totally adopt or like help, they are so cute! </p>
      </section>
    `}}window.customElements.define("my-view1",MyView1)});