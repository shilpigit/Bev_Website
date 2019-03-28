(function () {
    'use strict';

    define([
        'jquery',
        'service/config',
        'model/model',
        'service/utilities',
        'service/contents',
        'service/logger',
        'text!template/quarterly-awards-nomination-partial-view.html',
        'text!template/email/quarterly-awards-nomination-partial-view.html',
        'momentTimezone',
        'moment',
        'mandrill',
        'validate'
    ], function ($, config, model, utilities, contents, logger, nominationPartial, emailPartial, moment) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var wrapper = $(document).find('#other-content-wrapper');

        // private functions
        // send mail
        function sendMail(form) {

            var htmlEmail = '';
            var awardRadio = $('input:radio[name="award"]:checked');
            var firstNameNomineeInput = $('input[name="firstNameNominee"]');
            var lastNameNomineeInput = $('input[name="lastNameNominee"]');
            var currentPositionInput = $('input[name="currentPosition"]');
            var fromInput = $('input[name="from"]');
            var toInput = $('input[name="to"]');
            var areaCodeNomineeInput = $('input[name="areaCodeNominee"]');
            var phoneNumberNomineeInput = $('input[name="phoneNumberNominee"]');
            var emailNomineeInput = $('input[name="emailNominee"]');
            var firstNameNominatorInput = $('input[name="firstNameNominator"]');
            var lastNameNominatorInput = $('input[name="lastNameNominator"]');
            var companyNameInput = $('input[name="companyName"]');
            var addressInput = $('textarea[name="address"]');
            var areaCodeNominatorInput = $('input[name="areaCodeNominator"]');
            var phoneNumberNominatorInput = $('input[name="phoneNumberNominator"]');
            var emailNominatorInput = $('input[name="emailNominator"]');
            var personalCriteriaInput = $('textarea[name="personalCriteria"]');
            var professionalCriteriaInput = $('textarea[name="professionalCriteria"]');
            var leadershipAndIntegrityInput = $('textarea[name="leadershipAndIntegrity"]');
            var innovationInput = $('textarea[name="innovation"]');
            var resultsInput = $('textarea[name="results"]');
            var impactInput = $('textarea[name="impact"]');
            var additionalInformationInput = $('textarea[name="additionalInformation"]');

            var award = awardRadio.length ? awardRadio.val() : '-';
            var nameNominee = firstNameNomineeInput.val() + ' ' + lastNameNomineeInput.val();
            var currentPosition = currentPositionInput.val().length ? currentPositionInput.val() : '-';
            var from = fromInput.val().length ? fromInput.val() : '-';
            var to = toInput.val().length ? toInput.val() : '-';
            var areaCodeNominee = areaCodeNomineeInput.val().length ? areaCodeNomineeInput.val() : '-';
            var phoneNumberNominee = phoneNumberNomineeInput.val().length ? phoneNumberNomineeInput.val() : '-';
            var emailNominee = emailNomineeInput.val().length ? emailNomineeInput.val() : '-';
            var nameNominator = firstNameNominatorInput.val() + ' ' + lastNameNominatorInput.val();
            var companyName = companyNameInput.val().length ? companyNameInput.val() : '-';
            var address = addressInput.val().length ? addressInput.val() : '-';
            var areaCodeNominator = areaCodeNominatorInput.val().length ? areaCodeNominatorInput.val() : '-';
            var phoneNumberNominator = phoneNumberNominatorInput.val().length ? phoneNumberNominatorInput.val() : '-';
            var emailNominator = emailNominatorInput.val().length ? emailNominatorInput.val() : '-';
            var personalCriteria = personalCriteriaInput.val().length ? personalCriteriaInput.val() : '-';
            var professionalCriteria = professionalCriteriaInput.val().length ? professionalCriteriaInput.val() : '-';
            var leadershipAndIntegrity = leadershipAndIntegrityInput.val().length ? leadershipAndIntegrityInput.val() : '-';
            var innovation = innovationInput.val().length ? innovationInput.val() : '-';
            var results = resultsInput.val().length ? resultsInput.val() : '-';
            var impact = impactInput.val().length ? impactInput.val() : '-';
            var additionalInformation = additionalInformationInput.val().length ? additionalInformationInput.val() : '-';
            var dateSubmitted = moment.tz('Asia/Kuala_Lumpur').format('YYYY/MM/DD');

            // template mail
            htmlEmail += emailPartial
                .replace('*|date-submitted|*', dateSubmitted)
                .replace('*|award|*', award)
                .replace('*|nominees-name|*', nameNominee)
                .replace('*|current-position|*', currentPosition)
                .replace('*|from|*', from)
                .replace('*|to|*', to)
                .replace('*|nominees-area-code|*', areaCodeNominee)
                .replace('*|nominees-phone-number|*', phoneNumberNominee)
                .replace('*|nominees-email|*', emailNominee)
                .replace('*|nominators-name|*', nameNominator)
                .replace('*|company-name|*', companyName)
                .replace('*|address|*', address)
                .replace('*|nominators-area-code|*', areaCodeNominator)
                .replace('*|nominators-phone-number|*', phoneNumberNominator)
                .replace('*|nominators-email|*', emailNominator)
                .replace('*|personal-criteria|*', personalCriteria)
                .replace('*|professional-criteria|*', professionalCriteria)
                .replace('*|leadership-integrity|*', leadershipAndIntegrity)
                .replace('*|innovation|*', innovation)
                .replace('*|results|*', results)
                .replace('*|impact|*', impact)
                .replace('*|other-information|*', additionalInformation);

            // send mail
            var mandrill_client = new mandrill.Mandrill(config['keyMandrill']);
            var message = {
                    html: htmlEmail,
                    text: 'Award: ' + award +
                    ' | Nominee’s Name: ' + nameNominee +
                    ' | Current Position held within Company: ' + currentPosition +
                    ' | Length of Employment with current Company: | From: ' + from + ' | To: ' + to +
                    ' | Nominee’s Contact Number: | Area Code: ' + areaCodeNominee + ' | Phone Number : ' + phoneNumberNominee +
                    ' | Nominee’s Email Address: ' + emailNominee +
                    ' | Your (Nominator’s) Name: ' + nameNominator +
                    ' | Company Name: ' + companyName +
                    ' | Address: ' + address +
                    ' | Nominator’s Contact Number: | Area Code: ' + areaCodeNominator + ' | Phone Number : ' + phoneNumberNominator +
                    ' | Nominator’s Email Address: ' + emailNominator +
                    ' | Personal Criteria: ' + personalCriteria +
                    ' | Professional Criteria: ' + professionalCriteria +
                    ' | Leadership & Integrity: ' + leadershipAndIntegrity +
                    ' | Innovation: ' + innovation +
                    ' | Results: ' + results +
                    ' | Impact: ' + impact +
                    ' | Any other Information you would like to include about your Nominee: ' + additionalInformation +
                    ' | Date Submitted: ' + dateSubmitted,
                    subject: 'New Quarterly Awards Nomination Form',
                    from_email: 'no-reply@oildiversity.com',
                    from_name: 'Landing Page: Quarterly Awards Nomination Form',
                    to: [{
                        email: config['sendEmailTo'],
                        name: 'Oil Diversity',
                        type: 'to'
                    }],
                    headers: {
                        'Reply-To': 'no-reply@oildiversity.com'
                    },
                    important: !1,
                    track_opens: null,
                    track_clicks: null,
                    auto_text: null,
                    auto_html: null,
                    inline_css: null,
                    url_strip_qs: null,
                    preserve_recipients: null,
                    view_content_link: null,
                    bcc_address: null,
                    tracking_domain: null,
                    signing_domain: null,
                    return_path_domain: null,
                    merge: !0,
                    tags: ['quarterly-awards-nomination'],
                    metadata: {
                        website: 'www.oildiversity.com'
                    }
                },
                async = !1,
                ip_pool = 'Main Pool';

            mandrill_client.messages.send({
                message: message,
                async: async,
                ip_pool: ip_pool,
                send_at: new Date
            }, function () {

                utilities.scrollToTop();
                logger.qLogSuccess('Your Quarterly Awards Nomination has been sent successfully.');

                // empty controls
                $('input:radio[name="award"]').each(function () {
                    $(this).checked = false;
                });

                firstNameNomineeInput.val('');
                lastNameNomineeInput.val('');
                currentPositionInput.val('');
                fromInput.val('');
                toInput.val('');
                areaCodeNomineeInput.val('');
                phoneNumberNomineeInput.val('');
                emailNomineeInput.val('');
                firstNameNominatorInput.val('');
                lastNameNominatorInput.val('');
                companyNameInput.val('');
                addressInput.val('');
                areaCodeNominatorInput.val('');
                phoneNumberNominatorInput.val('');
                emailNominatorInput.val('');
                personalCriteriaInput.val('');
                professionalCriteriaInput.val('');
                leadershipAndIntegrityInput.val('');
                innovationInput.val('');
                resultsInput.val('');
                impactInput.val('');
                additionalInformationInput.val('');

                utilities.enableForm(form);

            }, function (error) {

                utilities.scrollToTop();
                logger.qLogError('A mandrill error occurred: ' + error.name + ' - ' + error.message);
                utilities.enableForm(form);

            });
        }
        
        // show
        function show() {

            contents.getValueByKey(config['aWebSiteQuarterlyAwardFormContentKey']).done(function () {

            var description = model.ModelContent['value'];
            wrapper.empty().append(nominationPartial.replaceAll('*|description|*', description));
            var form = '#quarterly-awards-nomination-form';
            
            $(form)
                .validate({
                    rules: {
                        firstNameNominee: {
                            required: true
                        },
                        lastNameNominee: {
                            required: true
                        },
                        emailNominee: {
                            email: true
                        },
                        firstNameNominator: {
                            required: true
                        },
                        lastNameNominator: {
                            required: true
                        },
                        emailNominator: {
                            email: true
                        }
                    },
                    submitHandler: function () {

                        utilities.disableForm(form);
                        sendMail(form);
                    }
                });

            });

        }

        return {
            show: show
        };

    });

})();