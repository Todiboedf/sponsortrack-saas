import json, pathlib, sys

HERE = pathlib.Path(__file__).parent
tpl = (HERE / 'template.html').read_text(encoding='utf-8')

SKELETON_HEAD = ('<!doctype html><html lang="fr"><head><meta charset="utf-8">'
                 '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
                 '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}'
                 'body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>'
                 '</head><body>')
SKELETON_FOOT = '</body></html>'

OUT = HERE / 'out'
OUT.mkdir(exist_ok=True)

for cle, titre, nom in [('roseyres', 'Roseyres.ch × Yverdon Sport FC', 'Roseyres-J09-dashboard'),
                        ('egokiefer', 'EgoKiefer × Yverdon Sport FC', 'EgoKiefer-J09-dashboard')]:
    data = json.loads((HERE / f'data-{cle}.json').read_text(encoding='utf-8'))
    frise = json.loads((HERE / f'frise-{cle}.json').read_text(encoding='utf-8'))
    overrides = HERE / f'video-{cle}.json'
    if overrides.exists():
        data['video'].update(json.loads(overrides.read_text(encoding='utf-8')))
    body = (tpl.replace('__TITLE__', titre)
               .replace('__DATA__', json.dumps(data, ensure_ascii=False))
               .replace('__FRISE__', json.dumps(frise)))
    (OUT / f'artifact-{cle}.html').write_text(body, encoding='utf-8')
    (OUT / f'{nom}.html').write_text(SKELETON_HEAD + body + SKELETON_FOOT, encoding='utf-8')
    print(cle, 'ok', len(body))
