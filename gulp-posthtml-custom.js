'use strict'

// Include dependencies
const url = require('url');

module.exports = function(options) {

    // Options
    options = options || {};
    options.excludeHosts = options.excludeHosts || [];
    options.attrRel = options.attrRel || [
        'nofollow',
        'noopener',
        'noreferrer'
    ];

    return function PLUGIN_NAME(tree) {
        tree.match({
            tag: 'a',
        }, (node) => {

            // Read all attributes form the link
            node.attrs = node.attrs || {};

            // Read the domain name from the URL
            const href = node.attrs.href;
            const link = url.parse(
                node.attrs.href,
                false,
                false
            );
            if (!link.hostname) {
                return node;
            }

            // Exclude certain domain names
            if (options.excludeHosts) {
                const shouldExclude = options.excludeHosts.find(hostname => hostname == link.hostname);
                if (shouldExclude) {
                    return node;
                }
            }

            // Add 'target="_blank" to the link
            node.attrs.target = '_blank';

            // Add 'rel=' to the link
            node.attrs.rel = options.attrRel.join(' ');

            // Remove the attribute Target in certain domain names
            if (options.noTarget) {
                const noTarget = options.noTarget.find(hostname => hostname == link.hostname);
                if (noTarget) {
                    delete node.attrs.target;
                }
            }

            // Remove the attribute Rel in certain domain names
            if (options.noRel) {
                const noRel = options.noRel.find(hostname => hostname == link.hostname);
                if (noRel) {
                    delete node.attrs.rel;
                }
            }

            return node;
        });
    };
};
