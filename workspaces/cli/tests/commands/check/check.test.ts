import { expect, test } from '@oclif/test';


describe('Command <check>', () => {
    test
        .stdout({ print: true })
        .command([ 'check', '--verbosity=2' ], {
            root: './context'
        })
        .it('Should properly output dependencies check', ctx => {
            console.dir(ctx.stdout);
            // expect(ctx.stdout).to.equal('jeff@example.com\n');
        });
});
