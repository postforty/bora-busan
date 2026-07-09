'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import MarkdownEditor from '@/components/admin/MarkdownEditor';
import { toast } from 'react-hot-toast';

const AVAILABLE_LANGUAGES = [
  { code: 'ko', name: '한국어 (Korean)' },
  { code: 'en', name: '영어 (English)' },
  { code: 'ja', name: '일본어 (Japanese)' },
  { code: 'zh', name: '중국어 (Chinese)' }
];

export default function AdminEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: originalSlug } = use(params);
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [postType, setPostType] = useState<'standard' | 'place' | 'course'>('standard');
  const [selectedLangs, setSelectedLangs] = useState<string[]>(['ko']);
  const [isTranslating, setIsTranslating] = useState<Record<string, boolean>>({});
  const [aiModel, setAiModel] = useState('gemini-3.1-flash-lite');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [initialData, setInitialData] = useState<any>(null);

  // Common fields
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('K-Pop Pilgrimage');
  const [badgeType, setBadgeType] = useState('primary');

  // Multilingual fields
  const [title, setTitle] = useState<Record<string, string>>({ ko: '', en: '', ja: '', zh: '' });
  const [description, setDescription] = useState<Record<string, string>>({ ko: '', en: '', ja: '', zh: '' });
  const [content, setContent] = useState<Record<string, string>>({ ko: '', en: '', ja: '', zh: '' });
  const [metadataJson, setMetadataJson] = useState<Record<string, string>>({ ko: '{}', en: '{}', ja: '{}', zh: '{}' });

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from('posts')
        .select('*, post_translations(*)')
        .eq('slug', originalSlug)
        .single();

      if (error || !data) {
        toast.error('게시글을 찾을 수 없습니다');
        router.push('/admin/dashboard');
        return;
      }

      setInitialData(data);
      setSlug(data.slug);
      setCategory(data.category || 'K-Pop Pilgrimage');
      setBadgeType(data.badge_type || 'primary');

      if (data.post_translations && data.post_translations.length > 0) {
        const langs: string[] = [];
        const newTitle = { ...title };
        const newDesc = { ...description };
        const newContent = { ...content };
        const newMeta = { ...metadataJson };

        data.post_translations.forEach((pt: any) => {
          langs.push(pt.locale);
          newTitle[pt.locale] = pt.title || '';
          newDesc[pt.locale] = pt.description || '';
          newContent[pt.locale] = pt.content || '';
          newMeta[pt.locale] = pt.metadata ? JSON.stringify(pt.metadata, null, 2) : '{}';

          if (pt.locale === 'ko' && pt.metadata?.type) {
            setPostType(pt.metadata.type);
          }
        });

        // Ensure 'ko' is always selected
        if (!langs.includes('ko')) langs.push('ko');

        setSelectedLangs(langs);
        setTitle(newTitle);
        setDescription(newDesc);
        setContent(newContent);
        setMetadataJson(newMeta);
      }

      setInitialLoading(false);
    }

    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalSlug]);

  const handleLangToggle = (code: string) => {
    if (selectedLangs.includes(code)) {
      if (code === 'ko') {
        toast.error('기본 언어(한국어)는 해제할 수 없습니다.');
        return;
      }
      setSelectedLangs(selectedLangs.filter(l => l !== code));
    } else {
      setSelectedLangs([...selectedLangs, code]);
    }
  };

  const handleMetadataTemplateChange = (type: 'standard' | 'place' | 'course') => {
    setPostType(type);
    let template = '{}';
    if (type === 'place') {
      template = JSON.stringify({
        type: "place",
        address: "주소를 입력하세요",
        nearest_station: "가까운 역",
        hours: "10:00 - 19:00",
        tips: "팁을 입력하세요",
        coordinates: { lat: 35.158, lng: 129.172 },
        related_content: [{ type: "mv", title: "관련 영상 제목" }]
      }, null, 2);
    } else if (type === 'course') {
      template = JSON.stringify({
        type: "course",
        duration_days: 1,
        transport: "지하철 + 도보",
        steps: [
          { time: "09:30-11:30", place_name: "방문지 이름", activities: ["인증샷", "굿즈샵"] }
        ]
      }, null, 2);
    }

    const newMetadata = { ...metadataJson };
    AVAILABLE_LANGUAGES.forEach(lang => {
      newMetadata[lang.code] = template;
    });
    setMetadataJson(newMetadata);
  };

  const handleAutoTranslate = async (targetLang: string) => {
    if (!title.ko && !description.ko && !content.ko) {
      toast.error('번역할 한국어 원문이 없습니다.');
      return;
    }

    setIsTranslating(prev => ({ ...prev, [targetLang]: true }));
    const toastId = toast.loading(`${targetLang.toUpperCase()} 언어로 AI 번역 중...`);

    try {
      const translate = async (text: string, isJson: boolean = false) => {
        if (!text) return '';
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, targetLocale: targetLang, isJson, model: aiModel })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        return data.translatedText;
      };

      const [tTitle, tDesc, tContent, tMeta] = await Promise.all([
        translate(title.ko),
        translate(description.ko),
        translate(content.ko),
        postType !== 'standard' ? translate(metadataJson.ko, true) : Promise.resolve('{}')
      ]);

      setTitle(prev => ({ ...prev, [targetLang]: tTitle }));
      setDescription(prev => ({ ...prev, [targetLang]: tDesc }));
      setContent(prev => ({ ...prev, [targetLang]: tContent }));
      if (postType !== 'standard') {
        setMetadataJson(prev => ({ ...prev, [targetLang]: tMeta }));
      }


      toast.success(`${targetLang.toUpperCase()} 자동 번역 완료!`, { id: toastId });
    } catch (err: any) {
      toast.error(`번역 실패: ${err.message}`, { id: toastId });
    } finally {
      setIsTranslating(prev => ({ ...prev, [targetLang]: false }));
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('권한이 없습니다');
      if (!slug) throw new Error('슬러그(URL)를 입력해야 합니다');

      const imageFile = formData.get('imageFile') as File | null;
      let image_url = initialData.image_url;

      if (imageFile && imageFile.size > 0) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `thumbnails/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('blog-media')
          .upload(filePath, imageFile);

        if (uploadError) throw new Error('이미지 업로드에 실패했습니다');

        const { data: { publicUrl } } = supabase.storage
          .from('blog-media')
          .getPublicUrl(filePath);

        image_url = publicUrl;
      }

      // 1. Update posts table
      const { error: postError } = await supabase
        .from('posts')
        .update({
          slug,
          category,
          badge_type: badgeType,
          image_url
        })
        .eq('id', initialData.id);

      if (postError) throw new Error(`게시글 기본 정보 수정 실패: ${postError.message}`);

      // 2. Upsert translations (requires unique constraint on post_id, locale)
      const translationsToUpsert = selectedLangs.map(lang => {
        let parsedMetadata = null;
        try {
          parsedMetadata = JSON.parse(metadataJson[lang]);
        } catch {
          throw new Error(`[${lang.toUpperCase()}] 메타데이터 JSON 형식이 잘못되었습니다.`);
        }

        if (!title[lang] || !description[lang] || !content[lang]) {
          throw new Error(`[${lang.toUpperCase()}] 모든 텍스트 필드를 입력해야 합니다.`);
        }

        // We lookup existing translation ID if available to do a clean update, 
        // but ON CONFLICT will handle it if we omit ID.
        return {
          post_id: initialData.id,
          locale: lang,
          title: title[lang],
          description: description[lang],
          content: content[lang],
          metadata: parsedMetadata
        };
      });

      const { error: translationError } = await supabase
        .from('post_translations')
        .upsert(translationsToUpsert, { onConflict: 'post_id,locale' });

      if (translationError) {
        throw new Error(`번역본 수정 실패: ${translationError.message}`);
      }

      // Also, we might want to delete translations that were unchecked.
      const unselectedLangs = AVAILABLE_LANGUAGES.map(l => l.code).filter(c => !selectedLangs.includes(c));
      if (unselectedLangs.length > 0) {
        await supabase
          .from('post_translations')
          .delete()
          .eq('post_id', initialData.id)
          .in('locale', unselectedLangs);
      }

      toast.success('게시글이 성공적으로 수정되었습니다!');
      router.push('/admin/dashboard');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : '오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  }

  if (initialLoading) {
    return <div className="container mx-auto px-4 pt-32 pb-12 max-w-4xl text-center text-on-surface-variant">게시글 데이터를 불러오는 중...</div>;
  }

  return (
    <div className="container mx-auto px-4 pt-32 pb-12 w-full max-w-7xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* Common Info Section */}
        <div className="bg-white shadow-sm rounded-2xl p-8 border border-outline-variant/30 flex flex-col gap-6">
          <h1 className="text-headline-md text-on-surface mb-2">다국어 게시글 수정</h1>

          <div className="flex flex-col md:flex-row gap-6 md:items-start mb-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">작성 언어 선택</label>
              <div className="flex gap-4">
                {AVAILABLE_LANGUAGES.map(lang => (
                  <label key={lang.code} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedLangs.includes(lang.code)}
                      onChange={() => handleLangToggle(lang.code)}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                      disabled={lang.code === 'ko'}
                    />
                    <span className="font-label-bold">{lang.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-64">
              <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">AI 번역 모델</label>
              <select
                value={aiModel}
                onChange={(e) => setAiModel(e.target.value)}
                className="px-4 py-2 border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              >
                <option value="gemini-3.1-flash-lite">Gemini 3.1 Flash-Lite</option>
                <option value="gemini-3.5-flash">Gemini 3.5 Flash</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">게시글 포맷 타입</label>
              <select
                value={postType}
                onChange={(e) => handleMetadataTemplateChange(e.target.value as 'standard' | 'place' | 'course')}
                className="px-4 py-3 border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              >
                <option value="standard">Standard (기본 블로그)</option>
                <option value="place">Place (장소 스팟형)</option>
                <option value="course">Course (코스 일정형)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">공통 슬러그 (URL)</label>
              <input
                name="slug"
                value={slug}
                onChange={e => setSlug(e.target.value)}
                required
                className="px-4 py-3 border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">카테고리</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="px-4 py-3 border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              >
                <option value="K-Pop Pilgrimage">K-Pop Pilgrimage</option>
                <option value="Cafe Tour">Cafe Tour</option>
                <option value="Coastal Life">Coastal Life</option>
                <option value="Foodie Finds">Foodie Finds</option>
                <option value="Arts & Design">Arts & Design</option>
                <option value="Events">Events</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">배지 타입</label>
              <select
                value={badgeType}
                onChange={e => setBadgeType(e.target.value)}
                className="px-4 py-3 border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="tertiary">Tertiary</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-label-bold text-on-surface-variant uppercase tracking-widest flex items-baseline gap-2">
              공통 썸네일 이미지
              <span className="text-xs font-normal normal-case text-on-surface-variant/70">(기존 이미지를 유지하려면 비워두세요)</span>
            </label>
            {initialData?.image_url && (
              <div className="mb-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={initialData.image_url} alt="현재 썸네일" className="h-20 w-auto rounded border border-outline-variant" />
              </div>
            )}
            <input type="file" name="imageFile" accept="image/*" className="px-4 py-3 border border-outline-variant rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-label-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
          </div>
        </div>

        {/* Translation Side-by-side Section */}
        <div className={`grid grid-cols-1 ${selectedLangs.length > 1 ? 'lg:grid-cols-2' : ''} gap-6 items-start`}>
          {selectedLangs.map((langCode) => (
            <div key={langCode} className="bg-white shadow-sm rounded-2xl p-6 border border-outline-variant/30 flex flex-col gap-6">
              <div className="flex justify-between items-center pb-4 border-b border-outline-variant/20">
                <h2 className="text-title-lg font-bold text-primary flex items-center gap-2">
                  {AVAILABLE_LANGUAGES.find(l => l.code === langCode)?.name}
                </h2>
                {langCode !== 'ko' && (
                  <button
                    type="button"
                    onClick={() => handleAutoTranslate(langCode)}
                    disabled={isTranslating[langCode]}
                    className="flex items-center gap-2 bg-secondary/10 text-secondary hover:bg-secondary/20 px-4 py-2 rounded-full font-label-bold transition-colors disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                    {isTranslating[langCode] ? '번역 중...' : 'AI 자동 번역'}
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">제목</label>
                <input
                  value={title[langCode]}
                  onChange={e => setTitle(prev => ({ ...prev, [langCode]: e.target.value }))}
                  required
                  className="px-4 py-3 border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="제목을 입력하세요"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">요약 설명</label>
                <textarea
                  value={description[langCode]}
                  onChange={e => setDescription(prev => ({ ...prev, [langCode]: e.target.value }))}
                  required
                  className="px-4 py-3 border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  rows={3}
                  placeholder="게시글의 짧은 요약"
                />
              </div>

              {postType !== 'standard' && (
                <div className="flex flex-col gap-2">
                  <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">Metadata (JSON)</label>
                  <textarea
                    value={metadataJson[langCode]}
                    onChange={(e) => setMetadataJson(prev => ({ ...prev, [langCode]: e.target.value }))}
                    className="px-4 py-3 border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none font-mono text-sm"
                    rows={8}
                  />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">본문 (마크다운)</label>
                <MarkdownEditor
                  initialValue={content[langCode]}
                  onChange={(val) => setContent(prev => ({ ...prev, [langCode]: val || '' }))}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 sticky bottom-6 z-10 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push('/admin/dashboard')}
            className="bg-surface-variant text-on-surface-variant font-label-bold py-4 px-8 rounded-xl hover:bg-outline-variant transition-colors shadow-md"
          >
            취소
          </button>
          <button
            disabled={loading}
            type="submit"
            className="bg-primary text-on-primary font-label-bold py-4 px-12 rounded-xl hover:bg-primary-container hover:text-on-primary-container disabled:opacity-50 transition-colors shadow-md"
          >
            {loading ? '수정 중...' : '다국어 게시글 수정'}
          </button>
        </div>
      </form>
    </div>
  );
}
