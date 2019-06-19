$(document).ready(() => {
    doIfUnlocked((account) => {
        const wait = findGetParameter('wait') === 'true';
        const target = findGetParameter('target');
        doIfMember(
            wait,
            () => {
                console.log('onTrue!');
                if (target == null) {
                    document.location.href = '/dashboard.html';
                } else {
                    document.location.href = '/' + findGetParameter('target') + '.html';
                }
            },
            () => {
                console.log('onFalse!');
                if (target == null) {
                    document.location.href = '/onboarding.html';
                } else {
                    document.location.href = '/startseite.html';
                }
            }
        );
    });
});