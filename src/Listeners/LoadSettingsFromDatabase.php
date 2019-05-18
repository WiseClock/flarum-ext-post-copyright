<?php

namespace WiseClock\PostCopyright\Listeners;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Api\Event\Serializing;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;

class LoadSettingsFromDatabase
{
    protected $settings;
    protected $fields = [
        'defaults',
        'addition',
        'primary_color',
        'icon',
        'align_right',
        'discussions_only',
        'allow_trespass',
    ];

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen(Serializing::class, [$this, 'prepareApiAttributes']);
    }

    public function prepareApiAttributes(Serializing $event)
    {
        if ($event->isSerializer(ForumSerializer::class))
        {
            foreach ($this->fields as $field)
            {
                $k = 'wiseclock.post-copyright.' . $field;
                $event->attributes[$k] = $this->settings->get($k);
            }
        }
    }
}
