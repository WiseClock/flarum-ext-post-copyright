<?php

namespace WiseClock\PostCopyright\Listeners;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Event\PrepareApiAttributes;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;

class LoadSettingsFromDatabase
{
    protected $settings;
    protected $fields = [
        'defaults',
        'addition',
        'primary_color',
        'only_discussions',
    ];

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen(PrepareApiAttributes::class, [$this, 'prepareApiAttributes']);
    }

    public function prepareApiAttributes(PrepareApiAttributes $event)
    {
        foreach ($this->fields as $field)
        {
            $k = 'wiseclock.post-copyright.' . $field;
            $event->attributes[$k] = $this->settings->get($k);
        }
    }
}
