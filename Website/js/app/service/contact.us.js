(function () {
    'use strict';

    define([
        'jquery',
        'service/config',
        'service/utilities',
        'service/logger',
        'text!template/contact-us-partial-view.html',
        'text!template/email/contact-us-partial-view.html',
        'momentTimezone',
        'moment',
        'mandrill',
        'validate'
    ], function ($, config, utilities, logger, contactUsPartial, emailPartial, moment) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var wrapper = $(document).find('#other-content-wrapper');

        // private functions
        // send mail
        function sendMail(form) {

            var htmlEmail = '';
            var nameInput = $('#name');
            var emailInput = $('#email');
            var messageInput = $('#message');
            var companyInput = $('#company');
            var jobTitleInput = $('#job-title');
            var contactNumberInput = $('#contact-number');
            var dateSubmitted = moment.tz('Asia/Kuala_Lumpur').format('YYYY/MM/DD');
            
            // template mail
            htmlEmail += emailPartial
                .replace('*|date-submitted|*', dateSubmitted)
                .replace('*|name|*', nameInput.val())
                .replace('*|email|*', emailInput.val())
                .replace('*|company|*', companyInput.val())
                .replace('*|job-title|*', jobTitleInput.val())
                .replace('*|contact-number|*', contactNumberInput.val())
                .replace('*|message|*', messageInput.val());

            // send mail
            var mandrill_client = new mandrill.Mandrill(config['keyMandrill']);
            var message = {
                    html: htmlEmail,

                    text: 'Name: ' + nameInput.val() +
                    ' | EMail: ' + emailInput.val() +
                    ' | Company: ' + companyInput.val() +
                    ' | Job Title: ' + jobTitleInput.val() +
                    ' | Contact Number: ' + contactNumberInput.val() +
                    ' | Message: ' + messageInput.val(),

                    subject: 'New Contact Request',
                    from_email: 'no-reply@oildiversity.com',
                    from_name: 'Landing Page: Contact Us',
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
                    tags: ['contact-us'],
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

                logger.qLogSuccess('Your Contact Request has been sent successfully.');

                // empty controls
                nameInput.val('');
                emailInput.val('');
                messageInput.val('');
                companyInput.val('');
                jobTitleInput.val('');
                contactNumberInput.val('');

                utilities.enableForm(form);

            }, function (error) {

                logger.qLogError('A mandrill error occurred: ' + error.name + ' - ' + error.message);
                utilities.enableForm(form);

            });

        }

        // show
        function show() {

            // set meta tags
            // utilities.setMetaTags4FB('Contact Us', 'Contact Us', '');

            wrapper.empty().append(contactUsPartial);

            var form = '#contact-us-form';
            $(form)
                .validate({
                    rules: {
                        name: {
                            required: true
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        company: {
                            required: true
                        },
                        jobTitle: {
                            required: true
                        },
                        contactNumber: {
                            required: true
                        },
                        message: {
                            required: true
                        }
                    },
                    submitHandler: function() {

                        utilities.disableForm(form);
                        sendMail(form);
                    }
                });
        }

        return {
            show: show
        };

    });

})();