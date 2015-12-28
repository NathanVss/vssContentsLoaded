describe("ContentsLoaded", function() {
    beforeEach(module('vssContentsLoaded'));

    var contentsLoaded;

    beforeEach(inject(function($injector){
        contentsLoaded = $injector.get('contentsLoaded');
    }));

    it('should give correct isContentLoaded', function() {
        expect(contentsLoaded.isContentLoaded('main-loaded')).toBe(false);
        contentsLoaded.addLoadedContent('main-loaded');
        expect(contentsLoaded.isContentLoaded('main-loaded')).toBe(true);
        expect(contentsLoaded.isContentLoaded('nav-loaded')).toBe(false);
    });

    it('should execute callback', function(done) {
        contentsLoaded.when('main-loaded', function() {
            done();
        });
        contentsLoaded.addLoadedContent('main-loaded');
    });

    it('should execute callback even if content is already loaded', function(done) {

        contentsLoaded.addLoadedContent('main-loaded');
        contentsLoaded.when('main-loaded', function() {
            done();
        });
    });

    it('should not execute callback', function() {
        spyOn(contentsLoaded, 'executeCallback').and.callThrough();

        contentsLoaded.when('nav-loaded', function() {
            // Should not be executed
        });
        contentsLoaded.addLoadedContent('main-loaded');

        expect(contentsLoaded.executeCallback).not.toHaveBeenCalled();
    });
});