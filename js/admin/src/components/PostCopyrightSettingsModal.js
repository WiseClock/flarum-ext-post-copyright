import SettingsModal from 'flarum/components/SettingsModal';
import Switch from "flarum/components/Switch";
import app from 'flarum/app';

export default class PostCopyrightSettingsModal extends SettingsModal
{
    className()
    {
        return 'WiseClockPostCopyrightSettingsModal Modal--medium';
    }

    title()
    {
        return app.translator.trans('wiseclock-post-copyright.admin.settings.title');
    }

    getStored()
    {
        var values = this.setting('wiseclock.post-copyright.defaults', '[true, true, true, true]')();
        return JSON.parse(values);
    }

    getDefaults(index)
    {
        return this.getStored()[index];
    }

    setDefaults(index, value)
    {
        var values = this.getStored();
        values[index] = value;
        var valueString = JSON.stringify(values);
        this.setting('wiseclock.post-copyright.defaults')(valueString);
    }

    form()
    {
        return [
            m('div', {className: 'Form-group'}, [
                m('fieldset', {className: 'WiseClockPostCopyright-default-ui'}, [
                    m('legend', {}, app.translator.trans('wiseclock-post-copyright.admin.settings.ui.title')),
                    Switch.component(
                    {
                        state: JSON.parse(this.setting('wiseclock.post-copyright.primary_color', 0)()),
                        onchange: this.setting('wiseclock.post-copyright.primary_color'),
                        children: app.translator.trans('wiseclock-post-copyright.admin.settings.ui.primary_color'),
                    }),
                ]),
                m('fieldset', {className: 'WiseClockPostCopyright-default-switch'}, [
                    m('legend', {}, app.translator.trans('wiseclock-post-copyright.admin.settings.defaults.title')),
                    m('div', {className: 'helpText'}, app.translator.trans('wiseclock-post-copyright.admin.settings.defaults.help')),
                    Switch.component(
                    {
                        state: this.getDefaults(0),
                        onchange: (value) => { this.setDefaults(0, value); },
                        children: app.translator.trans('wiseclock-post-copyright.admin.settings.defaults.authorized'),
                    }),
                    Switch.component(
                    {
                        state: this.getDefaults(1),
                        onchange: (value) => { this.setDefaults(1, value); },
                        children: app.translator.trans('wiseclock-post-copyright.admin.settings.defaults.sourced'),
                    }),
                    Switch.component(
                    {
                        state: this.getDefaults(2),
                        onchange: (value) => { this.setDefaults(2, value); },
                        children: app.translator.trans('wiseclock-post-copyright.admin.settings.defaults.paid'),
                    }),
                    Switch.component(
                    {
                        state: this.getDefaults(3),
                        onchange: (value) => { this.setDefaults(3, value); },
                        children: app.translator.trans('wiseclock-post-copyright.admin.settings.defaults.prohibited'),
                    }),
                ]),
                m('fieldset', {className: 'WiseClockPostCopyright-addition'}, [
                    m('legend', {}, app.translator.trans('wiseclock-post-copyright.admin.settings.addition.title')),
                    m('div', {className: 'helpText'}, app.translator.trans('wiseclock-post-copyright.admin.settings.addition.help')),
                    m('pre', 'mit,MIT License,You have to follow \u003ca href="https://opensource.org/licenses/MIT"\u003eThe MIT License\u003c/a\u003e in order to reproduce this post.'),
                    m('div', {className: 'helpText'}, app.translator.trans('wiseclock-post-copyright.admin.settings.addition.notes')),
                    m('textarea',
                    {
                        className: 'FormControl',
                        rows: 6,
                        value: this.setting('wiseclock.post-copyright.addition')(),
                        oninput: m.withAttr('value', this.setting('wiseclock.post-copyright.addition')),
                    }),
                ]),
            ]),
        ];
        /*
        return (
            <fieldset>
                <legend></legend>
            </fieldset>
            <div className="Form-group">
                <label htmlFor="client_id">{app.translator.trans('chin-colorful-logo.admin.settings.image_label')}</label>
                <input type="text" className="FormControl" bidi={this.setting('chin.colorful-logo.imageUrl')}></input>

                <label htmlFor="client_id">{app.translator.trans('chin-colorful-logo.admin.settings.imageDev_label')}</label>
                <input type="text" className="FormControl" bidi={this.setting('chin.colorful-logo.imageUrl_development')}></input>
            </div>
        );
        */
    }
}
