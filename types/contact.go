package types

type ContactMessage struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Subject string `json:"subject"`
	Message string `json:"message"`
	Context string `json:"context,omitempty"`
}

type NewsletterSubscription struct {
	Email   string `json:"email"`
	Context string `json:"context,omitempty"`
}
